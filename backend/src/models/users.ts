import { model, Schema } from 'mongoose';
import { User } from '../types/types';

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  resume: { type: String, default: ''},
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

schema.virtual('jobs', {
  ref: 'Jobs',
  localField: '_id',
  foreignField: 'author'
})

schema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password;

  return userObject;
}

export const UserModel = model<User>('Users', schema);
