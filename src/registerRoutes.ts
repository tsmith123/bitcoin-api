import express from 'express';
import createContext from './createContext';
import wrapRoute from '@utils/wrapRoute';
import * as controllers from '@controllers';

const registerRoutes = config => {
  const router = express.Router();
  const context = createContext(config);

  router.get('/', wrapRoute(context, controllers.getRoot));
  router.get('/test', wrapRoute(context, controllers.getTest));

  return router;
};

export default registerRoutes;
