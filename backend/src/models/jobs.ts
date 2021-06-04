import { model, Schema} from 'mongoose';
import { Job } from '../types/types';

const schema = new Schema<Job>({
    title: { type: String, required: true},
    salary: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    location: { type: String, required: true},
    companyName: { type: String, required: true},
    companyEmail: { type: String, required: true},
    noOfApplications: { type: Number, default: 0},
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Users'
    }
}, {
    timestamps: true
  })

export const JobModel = model<Job>('Jobs', schema);

