import { JobModel } from "../models/jobs";
import { Request, Response } from 'express';
import ResponseStatus from '../utils/response';
import mongoose from 'mongoose';
import { Job } from '../types/types';



const responseStatus = new ResponseStatus();
const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

export async function createJob ( req: Request, res: Response): Promise<Response> {

    try {
        const { title, salary, category, companyName, companyEmail, description, location }: Job = req.body
        const job = new JobModel({
            author: req.currentUser.ID,
            title,
            salary,
            category: category.toLocaleUpperCase(),
            companyName,
            companyEmail,
            location,
            description
        })
        const resData = await job.save()
        responseStatus.setSuccess(201, 'Successful', resData);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}

export async function getAllJobs (req:Request, res: Response): Promise<Response> {
    try {

        if (req.query) {
            const searchArr = ['title', 'category']
            let searchQuery: Record<string, any> = {};
            searchArr.forEach((field: string) => {
                if (req.query[field]) {
                    const cat = (req.query as any)[field]
                    const regex = new RegExp(escapeRegex(cat), 'gi');
                    req.query = { ...req.query };
                    searchQuery = { [field]: regex };
                }
            })
            const data = await JobModel.find(searchQuery);
            responseStatus.setSuccess(200, 'Successful', data);
            return responseStatus.send(res)
        }

        
        const data = await JobModel.find();
        if (!data) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res)
        }
        
        responseStatus.setSuccess(200, 'Successful', data);
        return responseStatus.send(res)

    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res)
    }

}

export async function getJobByCat(req: Request, res: Response): Promise<Response> {

    try {
        const capCat = req.params.category.toLocaleUpperCase()
        const data = await JobModel.find({ category: capCat})
        if (!data) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res)
        }
        responseStatus.setSuccess(200, 'Successful', data);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}

export async function getJobByAuthor(req: Request, res: Response): Promise<Response> {

    try {
        const authorId = mongoose.Types.ObjectId(req.params.id)
        const data = await JobModel.find({ author: authorId})
        if (!data) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res)
        }
        responseStatus.setSuccess(200, 'Successful', data);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}

export async function getOneJob (req: Request, res: Response): Promise<Response> {
    try {
        if (!req.params || !req.params.id) {
            responseStatus.setError(400, 'Bad request, please provide valid ID');
            return responseStatus.send(res)
        }
        if (!mongoose.Types.ObjectId(req.params.id)) {
            responseStatus.setError(400, 'Bad request, please provide valid ID');
            return responseStatus.send(res)
        }
        const jobId = mongoose.Types.ObjectId(req.params.id)
        const data = await JobModel.findById(jobId)
        if (!data) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res)
        }
        responseStatus.setSuccess(200, 'Successful', data);
        return responseStatus.send(res)
    } catch (error) {
        if (error.message.includes('hex')) {
            responseStatus.setError(400, 'Bad request, please provide valid ID');
            return responseStatus.send(res)
        }
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}



export async function updateOneJob (req: Request, res: Response): Promise<Response> {
    try {
        const jobId = mongoose.Types.ObjectId(req.params.id)
        const newJobInfo = await JobModel.findByIdAndUpdate(jobId, req.body, {new: true, runValidators: true})
        if(!newJobInfo) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res);
        }
        responseStatus.setSuccess(200, 'Successfully Updated', newJobInfo);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}

export async function deleteOneJob (req: Request, res: Response): Promise<Response>  {
    try {
        const jobId = mongoose.Types.ObjectId(req.params.id)
        await JobModel.findByIdAndDelete(jobId)
        const resData: [] = []
        responseStatus.setSuccess(200, 'Successfully Deleted', resData);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'internal server error');
        return responseStatus.send(res);
    }
}