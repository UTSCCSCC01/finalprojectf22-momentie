/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel from '../../model/userModel';
import ProfileModel from '../../model/profileModel';
import TimelineModel from '../../model/timelineModel';

const userLogin = (req: any, res: any) => {
    console.log("user: ", req.user);
    console.log("session id: ", req.sessionID);
    return res.send(req.user);
}

const userSignUp = (req: any, res: any) => {
    if (req.body.email === "" || req.body.email === undefined) {
        return res.status(400).send("Please fill in email");
    }
    if (req.body.password === "" || req.body.password === undefined) {
        return res.status(400).send("Please fill in password");
    }
    if (req.body.username === "" || req.body.username === undefined) {
        return res.status(401).send("Please fill in username");
    }
    const newUser = new UserModel({
        email: req.body.email,
        username: req.body.username,
    });
    UserModel.register(newUser, req.body.password, (err: any) => {
        if (err) {
            console.log(err);
            return res.status(409).send(err);
        }
        console.log(newUser);
        //after successfully sign up for a user, a profile needed to be created for the user
        let newPorfile = new ProfileModel({
            description: "",
            email: req.body.email,
            username: req.body.username,
        });
        ProfileModel.create(newPorfile, (err: any) => {
            if (err) {
                console.log(err);
                return res.status(409).send(err);
            }
            console.log(newPorfile);
            return res.status(200).send("user registered");
        });
    });
};

const userLogout = (req: any, res: any) => {
    req.logout((err: any) => {
        if (err) {
            console.log(err);
            return res.status(409).send(err);
        }
        return res.status(200).send("logout successfully")
    });
};

const userRetriByUsername = (req: any, res: any) => {
    const username = req.params["username"];
    UserModel.find({ "username": username }).sort({ createdAt: -1 }).exec((err: any, users: any) => {
        if (err) {
            return res.status(500).end(err);
        }
        return res.status(200).json(users);
    });
};

const userRetriBySkill = async (req: any, res: any) => {
    // Retrieve title from the request
    const title = req.params["title"];
    const regex = new RegExp(title, 'i')
    // Find all timeline objects containing 'title' in their <title> field
    let timelines = await TimelineModel.find({ "title": { $regex: regex } });

    // Some variables
    let emails: Set<String> = new Set();
    let users = new Array();

    // Retrieve distinct emails having that skill/experience
    timelines.forEach(timeline => {
        emails.add(timeline.get('email'));
    })

    // Convert set to array so that Promise can be applied
    let emails_arr = [...emails];

    // Promise
    Promise.all(emails_arr.map(async (email) => {
        // Find corresponding user accounts based on emails
        let user = await UserModel.findOne({ 'email': email });
        users.push(user)
    })).then(() => {
        // Return results wrapped in a list of JSON objects
        return res.status(200).json(users)
    })
};

module.exports = { userLogin, userSignUp, userLogout, userRetriByUsername, userRetriBySkill }