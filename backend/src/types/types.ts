import mongoose from 'mongoose';

interface User {
    id?: mongoose.Types.ObjectId
    name: string;
    email: string;
    password: string;
    role: string;
    bio?: string;
    resume?: string;
    token?: string;
    isActive?: boolean;
}

type ResponseData = Record<string, any> | Record<string, any>[]

interface Job {
    id?: mongoose.Types.ObjectId
    title: string;
    salary: string;
    category: string;
    description: string;
    location: string,
    companyName: string;
    companyEmail: string;
    author?: mongoose.Types.ObjectId
    noOfApplications?: number
}

interface Application {
    id?:mongoose.Types.ObjectId
    title:string;
    name:string;
    email:string;
    userID:mongoose.Types.ObjectId;
    jobID?:mongoose.Types.ObjectId;
    coverletter:string;
    resume:string;
}

export { User, ResponseData, Job , Application};
