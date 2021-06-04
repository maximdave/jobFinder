import express from 'express';
import { getAllJobs, getOneJob, createJob, deleteOneJob, updateOneJob, getJobByCat, getJobByAuthor} from '../controllers/jobs';
import jobMiddleware from '../middlewares/job';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

/* GET jobs listing. */
router.post('/', authMiddleware.verifyToken, jobMiddleware.postJob, createJob);
router.get('/', getAllJobs);
router.get('/:id', getOneJob);
router.get('/categories/:category', jobMiddleware.category, getJobByCat)
router.get('/employers/:id', jobMiddleware.employer, getJobByAuthor)
router.put('/:id', authMiddleware.verifyToken, jobMiddleware.updateJob, updateOneJob)
router.delete('/:id', authMiddleware.verifyToken, jobMiddleware.deleteJob, deleteOneJob)


export default router;
