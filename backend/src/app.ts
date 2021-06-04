import createError, { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import connectDB from './database/mongoConnect';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../', 'public')));
// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'jade');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/api/v1');
});

app.use('/api/v1', indexRouter);

connectDB();
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
