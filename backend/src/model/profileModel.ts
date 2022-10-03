import mongoose, { Schema, Types } from 'mongoose';

export interface Profile extends mongoose.Document {
    content: string;
    postBy: Types.ObjectId;
    like: number;
    image?: string //change to image id when enable uploading image feature
    createdAt?: string;
    updatedAt?: string;
};

const Profile = new Schema({
    content: { type: String, require: true },
    postBy: {type: Schema.Types.ObjectId, ref: 'userData', require: true},
    like: {type: Number, require: true, default: 0},
    image: {type: String}, //change to image id when enable uploading image feature
}, { timestamps: true });


const ProfileModel = mongoose.model('profileData', Profile);
export default ProfileModel;
