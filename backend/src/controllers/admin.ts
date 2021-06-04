import { UserModel } from "../models/users";
import { Request, Response } from 'express';
import ResponseStatus from '../utils/response';
import mongoose from 'mongoose';

const responseStatus = new ResponseStatus();

export async function getAllUsers (req:Request, res: Response): Promise<Response> {
    try {

        const data = await UserModel.find({});
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

export async function suspendUser (req:Request, res: Response): Promise<Response> {
    
    try {
        if (!req.params || !req.params.id) {
            responseStatus.setError(400, 'Please provide an ID');
            return responseStatus.send(res)
        } 
        const userId = mongoose.Types.ObjectId(req.params.id)
        const data = await UserModel.findById(userId)
        const currentUserId = mongoose.Types.ObjectId(req.currentUser.ID)

        if (userId.equals(currentUserId)) {
            responseStatus.setError(400, 'Cannot suspend self!!');
            return responseStatus.send(res)
        }
    
        if(!data) {
            responseStatus.setError(404, 'Not Found');
            return responseStatus.send(res)
        }
    
        const suspendedUser = await UserModel.findByIdAndUpdate(userId, {isActive: false})
        if (!suspendedUser) {
            responseStatus.setError(500, 'failed to update');
            return responseStatus.send(res)
        }

        responseStatus.setSuccess(200, 'successful', suspendedUser);
        return responseStatus.send(res)
    } catch (error) {
        responseStatus.setError(500, 'failed to update an error occurred');
        return responseStatus.send(res)
    }
}