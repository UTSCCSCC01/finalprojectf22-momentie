import UserTagModel from "../../model/userTagModel"
import TagModel from "../../model/tagModel";

const tagRetri = (req: any, res: any) => {
  const email = req.query.email;
  const type = req.body.type;
  const page = (parseInt(req.query.page) || parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1;
  const limit = (parseInt(req.query.limit) || parseInt(req.query.limit) > 0) ? parseInt(req.query.limit) : 10;
  if (email) {
    UserTagModel.find({email: email}, function(err: any, tags: any) {
      if (err) return res.status(500).end(err);
      return res.status(200).json(tags)
    })
  } else if (type) {
      TagModel.find({type: type}, null, {sort: {title: -1}, limit: limit, skip: limit * (page - 1)}, function(err: any, tags: any) {
        if (err) return res.status(500).end(err);
        return res.status(200).json(tags)
    })
  } else {
      return res.status(500).end('uesr email or type of type is required')
  }
}

module.exports = { tagRetri }
