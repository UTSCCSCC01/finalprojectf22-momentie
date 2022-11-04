import mongoose, { Schema } from 'mongoose';

export interface Profile extends mongoose.Document {
    description: string;
    email: string;
    username: string;
    like: number;
    image?: string //change to image id when enable uploading image feature
    createdAt?: string;
    updatedAt?: string;
};

const Profile = new Schema({
    description: { type: String, require: true },
    email: { type: String, ref: 'userData', require: true },
    username: { type: String, require: true },
    like: { type: Number, require: true, default: 0 },
    image: { type: String }, //change to image id when enable uploading image feature
}, { timestamps: true });


const ProfileModel = mongoose.model('profileData', Profile);
export default ProfileModel;