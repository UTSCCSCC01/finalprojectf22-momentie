import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new Schema({
    username: String,
    password: String
});
User.plugin(passportLocalMongoose);
const UserModel = mongoose.model('userData', User);

export = UserModel;
