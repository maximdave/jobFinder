import { UserModel } from '../models/users';
import { Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import ResponseStatus from '../utils/response';

const responseStatus = new ResponseStatus();

export default {
    isAdmin: async (req: Request, res: Response, next: NextFunction): Promise< Response | void > => {
        try {
            const userID = mongoose.Types.ObjectId(req.currentUser.ID)
            const data = await UserModel.findById(userID);

            if (data!.role !== 'admin') {
                responseStatus.setError(401, 'Unauthorized');
                return responseStatus.send(res);
            }

            return next()
        } catch (error) {
            responseStatus.setError(501, 'Internal server error');
            return responseStatus.send(res);
        }
    },
}