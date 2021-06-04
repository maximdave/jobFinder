import mongoose from 'mongoose';
import winston, { format } from 'winston';

const logger = winston.createLogger({
  format: format.combine(format.simple()),
  transports: [
    new winston.transports.Console(),
  ],
});

const connectDB = () => {
  const url: string = process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL as string : 'mongodb://127.0.0.1:27017/job-finder-api';
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      logger.log('info', 'Successfully connected to MongoDB Atlas!');
    }).catch((error) => {
      logger.log('error', error.message);
    });
};
export default connectDB;
