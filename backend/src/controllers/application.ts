import { ApplicationModel } from '../models/application';
import { Request, Response } from 'express';
import ResponseStatus from '../utils/response';
import mongoose from 'mongoose';
import { Application } from '../types/types';
import { JobModel } from '../models/jobs';

const responseStatus = new ResponseStatus();

// <<<<<<< addresume-to-applications
export async function createApplication(req:Request,res:Response): Promise<Response> {
    try {
        const { title,name,email,coverletter, resume}:Application = req.body
        const objJobId = mongoose.Types.ObjectId(req.params.jobId)
        const application = new ApplicationModel({
            userID: req.currentUser.ID,
            jobID: objJobId,
            title,
            name,
            email,
            coverletter,
            resume,
        })
        const resData = await application.save()
        await JobModel.findByIdAndUpdate(objJobId, { $inc: {noOfApplications: 1}})
        responseStatus.setSuccess(201, 'Successful', resData);
        return responseStatus.send(res)
    } catch (error) {
            if (error.message.includes('duplicate')) {
                responseStatus.setError(401, 'User already applied for this job');
                return responseStatus.send(res); 
            }
            responseStatus.setError(500, 'internal server error');
            return responseStatus.send(res);
        }
// =======
//   export async function createApplication(
//     req: Request,
//     res: Response
//   ): Promise<Response> {
//     try {
//       const { title, name, email, coverletter }: Application = req.body;
//       const objJobId = mongoose.Types.ObjectId(req.params.jobId);
//       const application = new ApplicationModel({
//         userID: req.currentUser.ID,
//         jobID: objJobId,
//         title,
//         name,
//         email,
//         coverletter,
//       });
//       const resData = await application.save();
//       await JobModel.findByIdAndUpdate(objJobId, {
//         $inc: { noOfApplications: 1 },
//       });
//       responseStatus.setSuccess(201, 'Successful', resData);
//       return responseStatus.send(res);
//     } catch (error) {
//       if (error.message.includes('duplicate')) {
//         responseStatus.setError(401, 'User already applied for this job');
//         return responseStatus.send(res);
//       }
//       responseStatus.setError(500, 'internal server error');
//       return responseStatus.send(res);
//     }
//   >>>>>>> main
  }

export async function getAllApplications(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const application = await ApplicationModel.find({});
    if (!application) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }

    responseStatus.setSuccess(200, 'Successful', application);
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}

export async function getApplicationsByJobId(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    if (!req.params || !req.params.jobId) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    if (!mongoose.Types.ObjectId(req.params.jobId)) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    const jobId = mongoose.Types.ObjectId(req.params.jobId);
    const data = await ApplicationModel.find({ jobID: jobId });
    if (!data) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }
    responseStatus.setSuccess(200, 'Successful', data);
    return responseStatus.send(res);
  } catch (error) {
    if (error.message.includes('hex')) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}

export async function getApplicationsByUserId(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    if (!req.params || !req.params.id) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    if (!mongoose.Types.ObjectId(req.params.id)) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    const userId = mongoose.Types.ObjectId(req.params.id);
    const data = await ApplicationModel.find({ userID: userId });
    if (!data) {
      responseStatus.setError(404, 'Not Found');
      return responseStatus.send(res);
    }
    responseStatus.setSuccess(200, 'Successful', data);
    return responseStatus.send(res);
  } catch (error) {
    if (error.message.includes('hex')) {
      responseStatus.setError(400, 'Bad request, please provide valid ID');
      return responseStatus.send(res);
    }
    responseStatus.setError(500, 'internal server error');
    return responseStatus.send(res);
  }
}
