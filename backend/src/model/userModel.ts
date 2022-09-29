import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface User extends mongoose.Document {
    email: string;
    username?: number;
    createdAt?: string;
    updatedAt?: string;
};

const User = new Schema({
    email: { type: String, require: true },
    username: { type: String },
}, { timestamps: true });

User.plugin(passportLocalMongoose, { usernameField: 'email' });
const UserModel = mongoose.model('userData', User);
export default UserModel;
