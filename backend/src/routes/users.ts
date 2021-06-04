/* eslint-disable no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth';
import { updateOneUser, updateResume } from '../controllers/user';
import upload from '../middlewares/multer';

const router = express.Router();

// resume upload route
router.post(
  '/resume',
  authMiddleware.verifyToken,
  upload,
  updateResume,
  (
    error: { message: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    res.status(400).json({
      status: 'error',
      message: error.message,
      data: [],
    })
);

router.put('/update/:id', authMiddleware.verifyToken, updateOneUser);

export default router;
