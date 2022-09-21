"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const sessionName = "MomentieUser";
const connection = "mongodb+srv://Chris:D0608c037a40@cluster0.qfiq3qb.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default.connect(connection, { ssl: true }).catch(error => console.log(error));
const Schema = mongoose_1.default.Schema;
const User = new Schema({
    username: String,
    password: String
});
User.plugin(passport_local_mongoose_1.default);
const UserModel = mongoose_1.default.model('userData', User);
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    name: sessionName,
    secret: 'Momentie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        secure: true,
        sameSite: "none",
    }
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(UserModel.createStrategy());
passport_1.default.serializeUser(UserModel.serializeUser());
passport_1.default.deserializeUser(UserModel.deserializeUser());
app.post('/login', passport_1.default.authenticate('local', { failureRedirect: '/' }), function (req, res) {
    console.log(req.user);
});
// passport.use(new LocalStrategy(
//     // function of username, password, done(callback)
//     function (username, password, done) {
//         // look for the user data
//         UserModel.findOne({ username: username }, function (err: any, user: any) {
//             // if there is an error
//             if (err) { return done(err); }
//             // if user doesn't exist
//             if (!user) { return done(null, false, { message: 'User not found.' }); }
//             // if the password isn't correct
//             if (!user.verifyPassword(password)) {
//                 return done(null, false, {
//                     message: 'Invalid password.'
//                 });
//             }
//             // if the user is properly authenticated
//             return done(null, user);
//         });
//     }
// ));
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(5000, () => console.log('Server Rrunning...'));
module.exports = { UserModel };
