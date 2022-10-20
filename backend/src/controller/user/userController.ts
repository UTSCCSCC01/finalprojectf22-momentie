/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel from '../../model/userModel';
import ProfileModel from '../../model/profileModel';

const userLogin = (req: any, res: any) => {
    console.log("user: ", req.user);
    console.log("session id: ", req.sessionID);
    return res.send(req.user);
}

const userSignUp = (req: any, res: any) => {
    if (req.body.email === "" || req.body.email === undefined) {
        return res.status(401).send("Please fill in email");
    }
    if (req.body.password === "" || req.body.password === undefined) {
        return res.status(401).send("Please fill in password");
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

module.exports = { userLogin, userSignUp, userLogout }