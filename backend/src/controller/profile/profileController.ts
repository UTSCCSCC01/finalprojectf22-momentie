import UserModel from '../../model/userModel';
import ProfileModel from '../../model/profileModel'

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
  if (!description)
    description = ''
  /** Update user profile */
  let newProfile = await ProfileModel.findOneAndUpdate({ email: email },
    { description: description }, { new: true })

  return res.status(200).json(newProfile)
}

module.exports = { retrieve_profile, edit_profile }