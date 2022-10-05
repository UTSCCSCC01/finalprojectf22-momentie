import UserModel from '../../model/userModel';
import ProfileModel from '../../model/profileModel'

const retrieve_profile = async (req: any, res: any) => {
  const { page, email } = req.query;
  /** email provided */
  if (email) {
    /* Find the target user */
    let user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(500).json({ msg: 'No such profile' })
    }
    /* Retrieve user profile based on the user id */
    let profile = await ProfileModel.find({ postBy: user?._id })

    console.log(profile)
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

module.exports = { retrieve_profile }