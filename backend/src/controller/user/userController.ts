/* Exports function that initializes API calls on express  */
// import * from './userAuth';
import UserModel, { User } from "../userModel";
import { Express } from 'express'

const userLogin = (req: any, res: any) => {
    console.log(req.user)
    return res.send("You are in111!");

module.exports = { userLogin }
