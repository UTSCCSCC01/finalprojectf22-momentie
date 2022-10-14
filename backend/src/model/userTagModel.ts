import mongoose, { Schema } from 'mongoose';

export interface UserTag extends mongoose.Document {
    email: string;
    title: string;
};

const UserTag = new Schema ({
    title: { type: String, require: true },
    email: { type: String, require: true },
},{ timestamps: true });

const UserTagModel = mongoose.model('userTagData', UserTag);
export default UserTagModel;
