import ProfileModel from '../../model/profileModel'
import LikeModel from '../../model/likeModel';

const retrieve_profile = async (req: any, res: any) => {
  const { page, email, popularity } = req.query;
  /** email provided */
  if (email) {

    /* Retrieve user profile based on the email */
    let profile = await ProfileModel.findOne({ email: email })

    if (!profile)
      return res.status(404).json({ err: 'Profile Not Found' })

    return res.status(200).json(profile)
  } else if (popularity === "true") {
      const numOfProfile = 5;
      const profile = await ProfileModel.find({}).sort({ like: -1}).limit(numOfProfile);
      if (profile) 
        return res.status(200).json(profile);
      else {
        return res.status(404).json({ err: 'Failed to find profiles' })
      }
  }

  /** Retrieve all profile data */
  let profiles = await ProfileModel.find()
  let profile_pool_size = profiles.length

  /** page provided but not email */
  if (page && page * 10 <= profile_pool_size) {
    let sorted_profiles = profiles.slice(page * 10, (page + 1) * 10 - 1)
    return res.status(200).json(sorted_profiles)
  }

  /** display the first 10 user profiles (neither email nor page is provided */
  return res.status(200).json(profiles.slice(0, 9))
}

const edit_profile = async (req: any, res: any) => {
  /** Params and body */
  let { email } = req.query
  let { description } = req.body
  /** Default empty content */
  if (!description) {
    let Profile = await ProfileModel.findOne({ email: email })
    return res.status(200).json(Profile)
  }

  /** Identity is not authenticated */
  if (req.user === undefined || !req.user.email == email)
    return res.status(401).json({ err: 'user is not authorized' })

  /** Update user profile */
  let newProfile = await ProfileModel.findOneAndUpdate({ email: email },
    { description: description }, { new: true })

  return res.status(200).json(newProfile)

}

const likeRetri = (req: any, res: any) => {
  const email = req.query.email;
  if (email) {
    ProfileModel.findOne({email: email}, function(err: any, profile: any) {
      if (err) return res.status(500).end(err);
      if (profile) {
        return res.status(200).json(profile.like)
      } else {
        return res.status(404).end('user is not exist')
      }
    })
  } else {
    return res.status(400).end('email is missing')
  }
}

const rate_profile = async (req: any, res: any) => {
  /** Get data from the request */
  let user = req.user
  let { email } = req.query
  let { like } = req.body
  /** Not logged in */
  if (!user)
    return res.status(401).send("User is not authorized...")

  /** NOT ALLOWED: Rate my own profile */
  if (user.email == email)
    return res.status(403).send("You cannot rate your own profile...")

  /** Rating */
  let myLike = await LikeModel.findOne({ "posterEmail": email, "raterEmail": user.email })
  /** Update value if you rated the profile before */
  if (myLike)
    await myLike.updateOne({ "rate": like })
  /** First time rate the profile */
  else {
    await LikeModel.create(new LikeModel({
      posterEmail: email,
      raterEmail: user.email,
      rate: like
    }))
  }
  /** Calculate new AVG rating value of the profile with EMAIL */
  let rates = await LikeModel.find({ "posterEmail": email })
  let totalRate = 0
  rates.forEach(rate => {
    totalRate += rate.toJSON().rate
  })

  let newProfile = await ProfileModel.findOneAndUpdate({ "email": email }, { "like": totalRate / rates.length }, { new: true })
  return res.status(200).json(newProfile)
}

module.exports = { retrieve_profile, edit_profile, rate_profile, likeRetri }