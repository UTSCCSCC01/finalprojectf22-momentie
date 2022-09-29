/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel from "../userModel";
import { Express } from 'express'
import { PassportStatic } from "passport";

export = function initializeAPI(app: Express, passport: PassportStatic) {

    /* Login API call. */
    app.post('/login', passport.authenticate('local'), function (req, res) {
        console.log(req.user)
        return res.send("You are in!");
    });
}
