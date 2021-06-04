import { Request, Response } from 'express';
import { UserModel } from '../models/users';
import ResponseStatus from '../utils/response';
import Validator from '../middlewares/validate';

const responseStatus = new ResponseStatus();

export async function signup(req: Request, res: Response): Promise<Response> {
  const { password } = req.body;
  const hashPassword: string = Validator.hashPassword(password);

  const data = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: hashPassword,
  };

  try {
    const User = new UserModel(data);
    const user = await User.save();
    const token: string = Validator.generateToken(user._id);
    responseStatus.setSuccess(201, 'successful', { user, token});
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(500, 'an error occurred');
    return responseStatus.send(res);
  }
}

export async function login(req: Request, res: Response) {
  const user = await UserModel.findOne({ _id: req.currentUser.ID });
  const token: string = Validator.generateToken(req.currentUser.ID);
  responseStatus.setSuccess(200, 'successful', {user, token});
  return responseStatus.send(res);
}
