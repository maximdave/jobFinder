import request from 'supertest';
import app from '../app';
import { JobModel } from '../models/jobs';
import mongoose from 'mongoose';
import { Job } from '../types/types'

let ADMINUSER: Record<string, any> = {}
let jobId: mongoose.Types.ObjectId = mongoose.Types.ObjectId()

beforeAll( async () => {
    const user = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'martins@yahoo.com', password: '12345678'})
    ADMINUSER = user.body
})

afterAll(async () => {
    await JobModel.findByIdAndDelete(jobId);
    await mongoose.connection.close();
});

describe('JOBS', () => {
    it('should post a job as a an auth admin or employer', async () => {
        const data: Job = { 
            title: 'this job', 
            salary: '120000', 
            category: 'Marketing',
            location: 'lagos',
            companyName: 'Decagon', 
            companyEmail: 'info@decagon.com',
            description: 'better job'
        }
        const res = await request(app)
        .post('/api/v1/jobs')
        .set('authorization', `Bearer ${ADMINUSER.data.token}`)
        .send(data)
        expect(res.status).toBe(201)
        jobId = mongoose.Types.ObjectId(res.body.data._id)
    })

    it('should fetch job by id', async () => {
        const res = await request(app)
        .get(`/api/v1/jobs/${jobId}`)
        expect(res.status).toBe(200)
    })

    it('should fetch job by category', async () => {
        const res = await request(app)
        .get(`/api/v1/jobs/categories/marketing`)
        expect(res.status).toBe(200)
    })

    it('should fetch job by author', async () => {
        const res = await request(app)
        .get(`/api/v1/jobs/employers/${ADMINUSER.data.user._id}`)
        expect(res.status).toBe(200)
    })

    it('should fetch all jobs', async () => {
        const res = await request(app)
        .get('/api/v1/jobs')
        expect(res.status).toBe(200)
    })

    it('should update a job as an admin or employer', async () => {
        const data = { 
            category: 'Technology', 
        }
        const res = await request(app)
        .put(`/api/v1/jobs/${jobId}`)
        .set('authorization', `Bearer ${ADMINUSER.data.token}`)
        .send(data)
        expect(res.status).toBe(200)
        expect(res.body.data.category).toBe(data.category)
    })

    it('should delete job as an admin or employer', async () => {
        const res = await request(app)
        .delete(`/api/v1/jobs/${jobId}`)
        .set('authorization', `Bearer ${ADMINUSER.data.token}`)
        expect(res.status).toBe(200);
    })

    
})