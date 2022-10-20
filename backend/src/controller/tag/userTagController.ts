import UserTagModel from "../../model/userTagModel"
import UserModel from "../../model/userModel";
import TagModel from "../../model/tagModel";

const userTagCreate = async (req: any, res: any) => {
  const email = req.query.email;
  const type = req.body.type;
  const title = req.body.title;

  if (type === "" || !type) {
    return res.status(401).end("type is missing");
  } else if (title === "" || !title) {
    return res.status(401).end("title is missing");
  } else if (email === "" || !email) {
    return res.status(401).end("email is missing");
  }

  UserModel.findOne({ email: email }, function (err: any, user: any) {
    if (err) return res.status(500).end(err);
    if (!user) {
      return res.status(404).end("user is not exist")
    } else {
      UserTagModel.findOne({ type: type, title: title, email: email }, function (err: any, userTag: any) {
        if (err) return res.status(500).end(err);
        else if (userTag) {
          return res.status(403).end('userTag already exist')
        } else {
          TagModel.findOne({ type: type, title: title }, function (err: any, tag: any) {
            const newUserTag = new UserTagModel({
              email: email,
              title: title,
              type: type,
            })
            if (err) return res.status(500).end(err);
            else if (!tag) {
              const newTag = new UserTagModel({
                title: title,
                type: type,
              })
              TagModel.create(newTag, function (err: any, tag: any) {
                if (err) res.status(500).end(err);
                else {
                  UserTagModel.create(newUserTag, function (err: any, userTag: any) {
                    if (err) return res.status(409).end(err)
                    else {
                      return res.status(200).send("userTag created")
                    }
                  })
                }
              })
            } else {
              UserTagModel.create(newUserTag, function (err: any, userTag: any) {
                if (err) return res.status(409).end(err)
                else {
                  return res.status(200).send("userTag created")
                }
              })
            }
          })
        }
      })
    }
  })
}

const userTagDelete = async (req: any, res: any) => {
  /** Get data from the request */
  const user = req.user
  const type = req.body.type
  const title = req.body.title
  /** Not logged in */
  if (!user) {
    return res.status(401).end('User is not authorized...')
  }
  /** Not provide required body data */
  if (!type || !title) {
    return res.status(403).end('Required info is not provided...')
  }
  /** Not allowed: Delete a tag that doesn't exist */
  let userTag = await UserTagModel.findOne({ email: user.email, type: type, title: title })
  if (!userTag) {
    return res.status(403).end('You should not be able to delete this tag...')
  }
  /** Delete the tag */
  await userTag.deleteOne()
  let tags = await UserTagModel.find({ email: user.email })
  /** Return the list of tags left to View */
  return res.status(200).json(tags)
}

module.exports = { userTagCreate, userTagDelete }
