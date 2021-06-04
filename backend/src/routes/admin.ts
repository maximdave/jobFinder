/* eslint-disable no-unused-vars */
import express from 'express';
import adminMiddleware from '../middlewares/admin';
import authMiddleware from '../middlewares/auth';
import { getAllUsers, suspendUser } from '../controllers/admin';


const router = express.Router();

/* GET users listing. */
router.get('/get-users', authMiddleware.verifyToken, adminMiddleware.isAdmin, getAllUsers );
router.put('/suspend-user/:id', authMiddleware.verifyToken, adminMiddleware.isAdmin, suspendUser );




export default router;