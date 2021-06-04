import express, { Request, Response } from 'express';
import authRoute from './auth';
import jobsRoute from './jobs';
import usersRoute from './users';
import applicationsRoute from './application';
import adminRoutes from './admin';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.send('JobFinder server is live');
});
router.use('/auth', authRoute);
router.use('/jobs', jobsRoute);
router.use('/users', usersRoute);
router.use('/applications', applicationsRoute)
router.use('/admin', adminRoutes);


export default router;
