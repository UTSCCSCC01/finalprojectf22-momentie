import mongoose, { Schema } from 'mongoose';

export interface Like extends mongoose.Document {
    posterEmail: string;
    raterEmail: string;
    rate: number;
};

const Like = new Schema ({
    posterEmail: { type: String, require: true },
    raterEmail: { type: String, require: true },
    rate: { type: Number, require: true },
},{ timestamps: true });

const LikeModel = mongoose.model('like', Like);
export default LikeModel;
