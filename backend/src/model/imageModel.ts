import mongoose, { Schema } from 'mongoose';

export interface Image extends mongoose.Document {
  file: JSON;
  uploadedAt?: string;
};

const Image = new Schema({
  file: {
    data: { type: Buffer },
    contentType: { type: String }
  }
}, { timestamps: true });

const LikeModel = mongoose.model('image', Image);
export default LikeModel;