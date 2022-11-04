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
        if (err) return res.status(500).end(err);
        if (!user) {
            return res.status(404).end("user does not exist");
        }
        const newPost = new PostModel({
            email: email,
            content: req.body.content,
            image: req.body.image,
        });

        PostModel.create(newPost, (err: any) => {
            if (err) return res.status(500).end(err);
            if (!user) {
                return res.status(404).end("user does not exist");
            }
            console.log(newPost);
            return res.status(200).send("post created");
        });
    })
}

const postGetByUser = (req: any, res: any) => {
    var email = req.params["email"];
    if(!email) {
        return res.status(400).end("Please provide email");
    }
    //get all posts of the user
    PostModel.find({"email": email}, (err: any, posts: any) => {
        if(err){
            return res.status(500).end(err);
        }
        return res.status(200).json(posts);
    });
}

module.exports = { postCreate, postGetByUser };

const postGetById = async (req: any, res: any) => {

    const postId = req.params["postId"]
    // Missing post id
    if (!postId) {
        return res.status(400).end("Post Id is not provided...")
    }
    // Find the post object in the database
    let postObj = await PostModel.findById(postId);
    // Posts not found
    if (!postObj) {
        return res.status(404).end("Post not found...")
    }
    // Found
    return res.status(200).json(postObj)
}

module.exports = { postCreate, postGetById };

