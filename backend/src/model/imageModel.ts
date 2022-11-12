import mongoose, { Schema } from 'mongoose';

export interface Image extends mongoose.Document {
  file: Object,
  createdAt?: string;
  updatedAt?: string;
};

const Image = new Schema({
  file: {
    data: { type: Buffer },
    contentType: { type: String }
  }
}, { timestamps: true });

const ImageModel = mongoose.model("imageData", Image);
export default ImageModel;