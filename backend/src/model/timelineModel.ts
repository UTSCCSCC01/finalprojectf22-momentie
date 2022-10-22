import mongoose, { Schema } from 'mongoose';

export interface Timeline extends mongoose.Document {
    email: string;
    topic: string;
    title: string;
    content: string;
    startTime: string;
    endTime: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
};

const Timeline = new Schema ({
    email: { type: String, ref: 'profileData', require: true },
    topic: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String, require: true },
    startTime: { type: String, require: true },
    endTime: { type: String, require: true },
    image: { type: String },
},{ timestamps: true });

const TimelineModel = mongoose.model('timelineData', Timeline);
export default TimelineModel;