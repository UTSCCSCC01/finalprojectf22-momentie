import UserTagModel from "../../model/userTagModel"

const tagRetri = (req: any, res: any) => {
  const email = req.query.email
  if (email) {
    UserTagModel.find({email: email}, function(err: any, tags: any) {
      if (err) return res.status(500).end(err);
      return res.status(200).json(tags)
    })
  } else {
      return res.status(500).end('uesr email is missing')
    }
  }

module.exports = { tagRetri }
