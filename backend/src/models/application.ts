import {model,Schema} from 'mongoose';
import {Application} from '../types/types';

const schema = new Schema<Application>({
    title:{
        type:String,
        required:true
    },
    name: {
      type: String,
      required: true   
    },
    email:{
        type: String,
        required: true
    },
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Users',
    },
    jobID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Jobs'
    },
    coverletter:{
        type:String,
        required:[true,'Cover letter is required']
    }, 
    resume: { type: String}
},{
    timestamps:true
})

export const ApplicationModel = model<Application>('Applications',schema)