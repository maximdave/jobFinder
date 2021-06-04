import { UserModel } from '../models/users';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ResponseStatus from '../utils/response';

const responseStatus = new ResponseStatus();

export async function getAllUsers(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const data = await UserModel.find({});
    if (!data) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }

    responseStatus.setSuccess(200, 'Successful', data);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}

export async function updateOneUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const newUserInfo = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newUserInfo) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }
    responseStatus.setSuccess(200, 'Successfully Updated', newUserInfo);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}
export async function suspendUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    if (!req.params || !req.params.id) {
      responseStatus.setError(400, 'Please provide an ID');
      return responseStatus.send(res);
    }
    const userId = mongoose.Types.ObjectId(req.params.id);
    const data = await UserModel.findById(userId);

    if (!data) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }

    const suspendedUser = await UserModel.findByIdAndUpdate(userId, {
      isActive: false,
    });
    if (!suspendedUser) {
      responseStatus.setError(500, 'failed to update');
      return responseStatus.send(res);
    }

    responseStatus.setError(200, 'successful');
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'failed to update an error occurred');
    return responseStatus.send(res);
  }
}

export async function updateResume(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const userId = mongoose.Types.ObjectId(req.currentUser.ID);
    const ext = req.file.originalname.split('.')[1];
    const filename = `jobfinder-${req.currentUser.ID}.${ext}`;
    const url = `${req.protocol}://${req.get('host')}/resumes/${filename}`;

    const data = await UserModel.findByIdAndUpdate(
      userId,
      { resume: url },
      { new: true }
    );
    if (!data) {
      responseStatus.setError(404, 'Not found');
      return responseStatus.send(res);
    }
    responseStatus.setSuccess(200, 'Successful', data);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}
