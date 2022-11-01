import mongoose, { Schema } from "mongoose";

export interface Post extends mongoose.Document {
    content: string;
    email: string;
    image: string;
};

const Post = new Schema ({
    content: { type: String },
    email: {type: String },
    image: {type: String },
},{ timestamps: true });

const PostModel = mongoose.model('postData', Post);
export default PostModel;
