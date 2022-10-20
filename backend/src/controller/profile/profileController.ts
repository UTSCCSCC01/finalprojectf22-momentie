import ProfileModel from '../../model/profileModel'
import LikeModel from '../../model/likeModel';
import { json } from 'body-parser';

const retrieve_profile = async (req: any, res: any) => {
  const { page, email } = req.query;
  /** email provided */
  if (email) {

    /* Retrieve user profile based on the email */
    let profile = await ProfileModel.findOne({ email: email })

    if (!profile)
      return res.status(501).json({ err: 'Profile Not Found' })

    return res.status(200).json(profile)
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
    return res.status(501).json({ err: 'Identity is not authenticated' })

  /** Update user profile */
  let newProfile = await ProfileModel.findOneAndUpdate({ email: email },
    { description: description }, { new: true })

  return res.status(200).json(newProfile)

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

module.exports = { retrieve_profile, edit_profile, rate_profile }
