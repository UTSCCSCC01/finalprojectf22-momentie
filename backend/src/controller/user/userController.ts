/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel, { User } from '../../model/userModel';
import { Express } from 'express'
import { time, timeStamp } from 'console';
import passport from "passport";
import passportLocal from "passport-local";
// import UserModel from '../../model/userModel';

const userLogin = (req: any, res: any) => {
    console.log(req.user)
    return res.send("You are in111!");
}

interface IReturnRegister{
    user: User | null;
    error: boolean;
    message: string;
}

const userSignUp = async ({email, username, password}:{email: string, username: string, password: string}) : Promise<IReturnRegister> => {
    const user = await UserModel.findOne({email: email});
    if(user){
        return {
            message: "User already exists",
            error: true,
            user: null
        }
    };
    const newUser = new UserModel ({
        email,
        username
    });
    let signUpUser = await UserModel.register(newUser, password);
    console.log("user registered");
    if (signUpUser){
        return {
            user: signUpUser as User,
            message: "Sign up successfully",
            error: false
        }
    }else{
        return {
            user: null,
            message: "Sign up error",
            error: true
        }
    }
};

module.exports = { userLogin, userSignUp }