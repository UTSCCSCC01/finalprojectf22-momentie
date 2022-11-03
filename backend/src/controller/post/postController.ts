import UserModel from '../../model/userModel';
import PostModel from '../../model/postModel';

const postCreate = (req: any, res: any) => {
    if (req.user === undefined) {
        return res.status(404).end("please login first");
    }

    const email = req.user.email;
    if (email === "" || email === undefined) {
        return res.status(401).send("Email missing");
    }

    UserModel.findOne({ email: email }, function (err: any, user: any) {
        if(err) return res.status(500).end(err);
        if(!user) {
            return res.status(404).end("user does not exist");
        }
        const newPost = new PostModel({
            email: email,
            content: req.body.content,
            image: req.body.image,
        });

        PostModel.create(newPost, (err: any) => {
            if(err) return res.status(500).end(err);
            if(!user){
                return res.status(404).end("user does not exist");
            }
            console.log(newPost);
            return res.status(200).send("post created");
        });
    })
}

module.exports = { postCreate };