import express from 'express';
import { signup, login } from '../controllers/auth';
import middleware from '../middlewares/auth';
import usersMiddleware from '../middlewares/users'

const router = express.Router();

router.post('/signup', middleware.signup, signup);
router.post('/login', middleware.login, usersMiddleware.isActiveUser, login);

export default router;
