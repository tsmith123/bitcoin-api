import express from 'express';
import createContext from './createContext';
import wrapRoute from '@utils/wrapRoute';
import * as handlers from './handlers';

const registerRoutes = config => {
  const router = express.Router();
  const context = createContext(config);

  router.get('/', wrapRoute(context, handlers.getRoot));
  router.get('/test', wrapRoute(context, handlers.getTest));

  return router;
};

export default registerRoutes;
