import mongoose, { Schema } from 'mongoose';

export interface Like extends mongoose.Document {
    email: string;
    title: string;
    rate: number;
};

const Like = new Schema ({
    title: { type: String, require: true },
    email: { type: String, require: true },
    rate: { type: Number, require: true },
},{ timestamps: true });

const LikeModel = mongoose.model('like', Like);
export default LikeModel;
