import express from 'express';
import applicationMiddleware from '../middlewares/application';
import { createApplication, getAllApplications, getApplicationsByJobId, getApplicationsByUserId} from '../controllers/application';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.get('/',authMiddleware.verifyToken, getAllApplications);
router.post('/:jobId',authMiddleware.verifyToken,createApplication,applicationMiddleware.createApplication);
router.get('/:jobId',authMiddleware.verifyToken, getApplicationsByJobId);
router.get('/applicant/:id',authMiddleware.verifyToken, getApplicationsByUserId)

export default router;