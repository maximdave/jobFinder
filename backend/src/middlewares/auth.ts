import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { UserModel } from '../models/users';
import ResponseStatus from '../utils/response';
import Validator from './validate';
import { User } from '../types/types';
import mongoose from 'mongoose';

const responseStatus = new ResponseStatus();

export default {
  signup: async (req:Request, res: Response, next: NextFunction): Promise< Response | void > => {
    const { password, email, role, name, }: User = req.body;
    if (!password || !email || !name) {
      responseStatus.setError(400, 'one or more field is empty');
      return responseStatus.send(res);
    }

    if (!Validator.isValidEmail(email)) {
      responseStatus.setError(400, 'Invalid Email');
      return responseStatus.send(res);
    }

    if (!role || !Validator.userRoleDataValidation(role)) {
      responseStatus.setError(400, 'Role field is missing');
      return responseStatus.send(res);
    }

    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      responseStatus.setError(403, 'Email already exists');
      return responseStatus.send(res);
    }
    return next();
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<Response | void > => {
    const { password, email } = req.body;
    if (!password || !email) {
      responseStatus.setError(400, 'email or password is empty');
      return responseStatus.send(res);
    }

    const emailExist = await UserModel.findOne({ email });
    if (!emailExist) {
      responseStatus.setError(401, 'Email or Password invalid');
      return responseStatus.send(res);
    }

    if (!Validator.comparePassword(emailExist.password, password)) {
      responseStatus.setError(401, 'Email or Password invalid');
      return responseStatus.send(res);
    }

    req.currentUser = {
      ID: emailExist._id,
    };

    return next();
  },

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        responseStatus.setError(400, 'Bearer Token missing');
        return responseStatus.send(res);
      }
      const token: string = req.headers.authorization.split(' ')[1];
      const decodedToken = <any>JWT.verify(token, process.env.JWT_SECRET!);
      if (!decodedToken) {
        responseStatus.setError(401, 'Invalid Token Or Token has expired');
        return responseStatus.send(res);
      }

      const userID = mongoose.Types.ObjectId(decodedToken.userID)
      const data = await UserModel.findById(userID);

      if (!data || !data.isActive ) {
          responseStatus.setError(401, 'Unauthorized');
          return responseStatus.send(res);
      }

      req.currentUser = {
        ID: decodedToken.userID,
      };

      return next();
    } catch (error) {
      if (error.message && error.message.includes('jwt')) {
        responseStatus.setError(401, 'Invalid token or token has expired');
        return responseStatus.send(res);
      }
      responseStatus.setError(500, 'An unknown error occurred');
      return responseStatus.send(res);
    }
  },
};
