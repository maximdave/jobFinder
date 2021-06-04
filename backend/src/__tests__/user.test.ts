import request from 'supertest';
import app from '../app';
import { UserModel } from '../models/users';
import mongoose from 'mongoose';
import { User } from '../types/types';

const currentUser: Record<string, any> = {};


afterAll(async () => {
  await UserModel.findByIdAndDelete(currentUser.ID);
  await mongoose.connection.close();
});

describe('User Authentication', () => {
  it('should signup a new user', async () => {
    const data: User = {
      name: 'emeka martins',
      email: 'emeka@yahoo.com',
      password: '12345678',
      role: 'applicant',
      bio: 'big head'
    };
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    expect(res.status).toBe(201);
    currentUser.ID = res.body.data.user._id;
    currentUser.email = res.body.data.user.email;
    currentUser.name = res.body.data.user.name;
  });

  it('should log user in', async () => {
    const data = {
      email: 'emeka@yahoo.com',
      password: '12345678',
    };
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(data);
    expect(res.status).toBe(200);
    currentUser.ID = res.body.data.user._id;
    currentUser.email = res.body.data.user.email;
    currentUser.name = res.body.data.user.name;
  });

});
