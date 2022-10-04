/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel, { User } from '../../model/userModel';
import { Express } from 'express'
import { time, timeStamp } from 'console';
import passport from "passport";
import passportLocal from "passport-local";
// import UserModel from '../../model/userModel';
import passportLocalMongoose from 'passport-local-mongoose';

const userLogin = (req: any, res: any) => {
    console.log(req.user)
    return res.send("You are in111!");
}

const userSignUp = (req: any, res: any) => {
    const newUser = new UserModel ({
        email: req.body.email,
        username: req.body.username,
    });
    UserModel.register(newUser, req.body.password, (err: any) => {
        if (err){
            console.log(err);
            console.log(req.body.username);
            console.log(req.body.email);
            return res.status(409).send(err);
        }
        console.log(newUser);
        return res.status(200).send("user registered");
    });
};

module.exports = { userLogin, userSignUp }