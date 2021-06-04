/* eslint-disable no-unused-vars */
import { UserModel } from '../../src/models/users';
import { JobModel } from '../../src/models/jobs';

declare global {
    namespace Express {
        interface Request {
            currentUser: UserModel,
            category: JobModel
        }
    }
}
