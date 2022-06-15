import express, { Response } from 'express';
import createContext from './createContext';
import wrapRoute from '@utils/wrapRoute';
import { RequestContext } from '@types';

const registerRoutes = config => {
  console.log('Registering routes...');

  const router = express.Router();
  const context = createContext(config);

  // router.get('/', handler);
  router.get('/', wrapRoute(context, (req: RequestContext, res: Response) => {
    res.send('Hello World');
  }));
  router.get('/test', wrapRoute(context, (req: RequestContext, res: Response) => {
    res.send('Test');
  }));

  return router;
};

export default registerRoutes;
