import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors'
import expressSession from 'express-session';

const sessionName = "MomentieUser";
const connection: string = "mongodb+srv://Chris:D0608c037a40@cluster0.qfiq3qb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection, { ssl: true }).catch(error => console.log(error));

const app = express();
app.use(cors());
app.use(expressSession({
    name: sessionName,
    secret: 'Momentie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        httpOnly: true,
        secure: false,
        sameSite: "none",
    }
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

import UserModel, { init } from './model/userModel';
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

import initializeAPI from './controller/user/userController'
initializeAPI(app, passport);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log('Server Running...'));

module.exports = { UserModel }
