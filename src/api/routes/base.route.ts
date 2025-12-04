import {Application} from 'express';
import userRouter from './user.routes';
import octoparseRouter from './octoparse.routes';

export default function setup(app: Application) {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/octoparse', octoparseRouter);
}
