import { ApplicationModel } from '../models/application';
import { Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import ResponseStatus from '../utils/response';
import { Application } from '../types/types'

const responseStatus = new ResponseStatus();

export default {
    createApplication: async (req: Request, res: Response, next: NextFunction): Promise< Response | void > => {
        try {
            if (!req.params || !req.params.jobId){
                responseStatus.setError(400, 'Please provide an ID');
                return responseStatus.send(res);
            }

            const userID = mongoose.Types.ObjectId(req.currentUser.ID)
            const data = await ApplicationModel.find(userID);

            if (!data) {
                responseStatus.setError(401, 'Unauthorized');
                return responseStatus.send(res);
            }

            const { title, name, email, coverletter, resume }: Application = req.body
            if (!title || !name || !email || !coverletter || !resume ) {
                responseStatus.setError(400, 'One or more required fields are empty');
                return responseStatus.send(res);
            }

            return next()
        } catch (error) {
            responseStatus.setError(501, 'Internal server error');
            return responseStatus.send(res);
        }
    }
}