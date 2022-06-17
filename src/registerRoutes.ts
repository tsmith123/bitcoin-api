import express from 'express';
import createContext from './createContext';
import wrapRoute from './utils/wrapRoute';
import { getRoot, getTest } from './controllers';

const registerRoutes = config => {
  const router = express.Router();
  const context = createContext(config);

  router.get('/', wrapRoute(context, getRoot));
  router.get('/test', wrapRoute(context, getTest));

  return router;
};

export default registerRoutes;
