import mongoose, { Schema } from 'mongoose';

export interface Tag extends mongoose.Document {
    title: string;
    type: string;
};

const Tag = new Schema ({
    title: { type: String },
    type: { type: String },
},{ timestamps: true });

const TagModel = mongoose.model('tagData', Tag);
export default TagModel;
