import { profile } from 'console';
import mongoose, { Schema } from 'mongoose';

export interface Timeline extends mongoose.Document {
    email: string;
    experienceTitle: string;
    experienceContent: string;
    title: string;
    content: string;
    startTime?: string;
    endTime?: string;
    createdAt: string;
    updatedAt: string;
};

const Timeline = new Schema ({
    email: { type: String, ref: 'profileData', require: true },
    experienceTitle: { type: String },
    experienceContent: { type: String },
    title: { type: String },
    content: { type: String },
    startTime: { type: String },
    endTime: { type: String },
},{ timestamps: true });

const TimelineModel = mongoose.model('timelineData', Timeline);
export default TimelineModel;