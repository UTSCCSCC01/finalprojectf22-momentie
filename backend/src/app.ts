import express from 'express';
import mongoose, { PassportLocalSchema } from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors'
import { Strategy as LocalStrategy } from 'passport-local';
import expressSession from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';


const sessionName = "MomentieUser";
const connection: string = "mongodb+srv://Chris:D0608c037a40@cluster0.qfiq3qb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection, { ssl: true }).catch(error => console.log(error));

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String
});
User.plugin(passportLocalMongoose, { usernameField: "username" });
const UserModel = mongoose.model('userData', User);

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
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

app.post('/login', passport.authenticate('local'), function (req, res) {
    console.log(req.user)
    return res.send("You are in!");
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log('Server Rrunning...'));

module.exports = { UserModel }
