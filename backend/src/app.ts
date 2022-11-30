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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(expressSession({
    name: sessionName,
    secret: 'Momentie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    }
}));
app.set('trust proxy', 1)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

import UserModel from './model/userModel';
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

//import initializeAPI from './controller/user/userController'
//initializeAPI(app, passport);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/profile', require('./routes/profile'))
app.use('/account', require('./routes/account'))
app.use('/tag', require('./routes/tag'))
app.use('/post', require('./routes/post'))

app.listen(5000, () => console.log('Server Running...'));

module.exports = { UserModel }
