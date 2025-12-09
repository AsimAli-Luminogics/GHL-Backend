import {Application} from 'express';
import oAuthRouter from './oAuth.routes';

export default function setup(app: Application) {
  app.use('/api/v1/auth', oAuthRouter);
}
