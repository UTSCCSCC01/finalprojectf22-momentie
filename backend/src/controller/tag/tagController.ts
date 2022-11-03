import UserTagModel from "../../model/userTagModel"
import TagModel from "../../model/tagModel";

const tagRetri = (req: any, res: any) => {
  const email = req.query.email;
  const type = req.body.type;
  const page = (parseInt(req.query.page) || parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1;
  const limit = (parseInt(req.query.limit) || parseInt(req.query.limit) > 0) ? parseInt(req.query.limit) : 10;
  if (email) {
    UserTagModel.find({ email: email }, function (err: any, tags: any) {
      if (err) return res.status(500).end(err);
      return res.status(200).json(tags)
    })
  } else if (type) {
    TagModel.find({ type: type }, null, { sort: { title: -1 }, limit: limit, skip: limit * (page - 1) }, function (err: any, tags: any) {
      if (err) return res.status(500).end(err);
      return res.status(200).json(tags)
    })
  } else {
    return res.status(500).end('uesr email or tag type is required')
  }
}

const popularTags = async (req: any, res: any) => {
  const { MaxPriorityQueue } = require('vanilla-priority-queue');
  const tags = await UserTagModel.find();
  let rank = new Map();
  let maxPQ = new MaxPriorityQueue();
  let resTags: Array<String> = []

  // Calculate occurrence of each title
  tags.forEach(tag => {
    let title = tag.get('title');
    console.log(title, rank.get(title))
    if (rank.get(title) === undefined) {
      rank.set(title, 1);
    }
    else {
      rank.set(title, rank.get(title) + 1);
    }
  })

  // Convert the map into maxPriority Queue based on their ocurrence
  rank.forEach((value, key) => {
    maxPQ.insert(key, value)
  })

  // Get the top 10 tags
  for (let i = 0; i < 10 && !maxPQ.isEmpty(); i++) {
    resTags.push(maxPQ.remove())
  }

  return res.status(200).send(resTags)
}

module.exports = { tagRetri, popularTags }
