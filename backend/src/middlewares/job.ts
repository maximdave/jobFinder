import { UserModel } from '../models/users';
import { JobModel } from '../models/jobs'
import { Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import ResponseStatus from '../utils/response';
import { Job, User } from '../types/types'
import { categories } from '../utils/categories';
import { roles } from '../utils/roles';

const responseStatus = new ResponseStatus();
// const roles: string[] = ['employer', 'admin']

const authenticateUserType = (data: (User & mongoose.Document<any, any>) | null): boolean => {
    if (!data) return false
    if (!roles.includes(data.role)) return false
    return true
}

const authenticateJobAuthor = async (
    userData: (User & mongoose.Document<any, any>) | null, 
    jobId: mongoose.Types.ObjectId, 
    userID: mongoose.Types.ObjectId
): Promise<boolean> => {

    const jobData = await JobModel.findById(jobId)

    if (!jobData) return false
    
    const authorId = mongoose.Types.ObjectId(`${jobData!.author}`)


    if (userData!.role === 'applicant') return false
    
    if (userData!.role === 'employer' && !authorId.equals(userID)) return false

    return true
}



export default {

    postJob: async (req: Request, res: Response, next: NextFunction): Promise< Response | void > => {
        try {
            const userID = mongoose.Types.ObjectId(req.currentUser.ID)
            const data = await UserModel.findById(userID);
            if (!authenticateUserType(data)) {
                responseStatus.setError(401, 'Unauthorized');
                return responseStatus.send(res);
            }

            const { title, salary, category, companyName, companyEmail, description, location }: Job = req.body
            if (!title || !salary || !companyName || !companyEmail || !category || !description || !location) {
                responseStatus.setError(400, 'One or more required fields are empty');
                return responseStatus.send(res);
            }

            return next()
        } catch (error) {
            responseStatus.setError(501, 'Internal server error');
            return responseStatus.send(res);
        }
    },

    deleteJob: async (req: Request, res: Response, next:NextFunction): Promise< Response | void > => {
        try {
            if (!req.params || !req.params.id) {
                responseStatus.setError(400, 'Bad Request please provide id');
                return responseStatus.send(res);
            }

            const userID = mongoose.Types.ObjectId(req.currentUser.ID)
            const jobId = mongoose.Types.ObjectId(req.params.id)
            const userData = await UserModel.findById(userID);

            if (!authenticateUserType(userData)) {
                responseStatus.setError(401, 'Unauthorized');
                return responseStatus.send(res);
            }


            const result = await authenticateJobAuthor(userData, jobId, userID)
            if (!result) {
                responseStatus.setError(401, 'Unauthorized or Job does not exist');
                return responseStatus.send(res);
            }


            return next()    

        } catch (error) {
            responseStatus.setError(500, 'An internal error occurred');
            return responseStatus.send(res);
        }
    },

    updateJob: async (req: Request, res: Response, next:NextFunction) => {
        try {
            const allowedUpdates: string[] = ['title', 'category', 'salary', 'description', 'companyName', 'companyEmail', 'location']
            const updates = Object.keys(req.body);
            const isAllowed = updates.every((update) => allowedUpdates.includes(update));

            if (!isAllowed) {
                responseStatus.setError(400, 'Bad Request, invalid fields provided');
                return responseStatus.send(res);
            }

            if (!req.params || !req.params.id) {
                responseStatus.setError(400, 'Bad Request please provide id');
                return responseStatus.send(res);
            }

            if (Object.keys(req.body).length === 0) {
                responseStatus.setError(400, 'Bad Request please provide valid data');
                return responseStatus.send(res);
            }
            const userID = mongoose.Types.ObjectId(req.currentUser.ID)
            const jobId = mongoose.Types.ObjectId(req.params.id)
            const userData = await UserModel.findById(userID);

            
            if (!authenticateUserType(userData)) {
                responseStatus.setError(401, 'Unauthorized');
                return responseStatus.send(res);
            }


            const result = await authenticateJobAuthor(userData, jobId, userID)
            if (!result) {
                responseStatus.setError(401, 'Unauthorized or Job does not exist');
                return responseStatus.send(res);
            }


            return next()    

        } catch (error) {
            responseStatus.setError(500, 'An internal error occurred');
            return responseStatus.send(res);
        }
    },

    category: async (req: Request, res: Response, next:NextFunction) => {
    
       try {
            if (!req.params || !req.params.category) {
                responseStatus.setError(400, 'Bad request, please provide valid category');
                return responseStatus.send(res)
            }
            if (!categories.includes(req.params.category.toLocaleUpperCase())) {
                responseStatus.setError(400, 'Bad request, please provide valid category');
                return responseStatus.send(res)
            }
            return next()
       } catch (error) {
        responseStatus.setError(400, 'Bad request, please provide valid ID');
        return responseStatus.send(res)
       }
    },

    employer: async (req: Request, res: Response, next:NextFunction) => {
       try {
            if (!req.params || !req.params.id) {
                responseStatus.setError(400, 'Bad request, please provide valid ID');
                return responseStatus.send(res)
            }
            if (!mongoose.Types.ObjectId(req.params.id)) {
                responseStatus.setError(400, 'Bad request, please provide valid ID');
                return responseStatus.send(res)
            }
            return next()
       } catch (error) {
        responseStatus.setError(400, 'Bad request, please provide valid ID');
        return responseStatus.send(res)
       }
    }
}