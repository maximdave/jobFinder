import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

let ADMINUSER: Record<string, any> = {}



beforeAll( async () => {
  const user = await request(app)
  .post('/api/v1/auth/login')
  .send({ email: 'martins@yahoo.com', password: '12345678'})
  ADMINUSER = user.body
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe('Admin privileges', () => {
    it('should fetch all users in database', async () => {
      const res = await request(app)
      .get('/api/v1/admin/get-users')
      .set('authorization', `Bearer ${ADMINUSER.data.token}`)
      expect(res.status).toBe(200)
    })
});