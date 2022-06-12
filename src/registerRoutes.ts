import express from 'express';
import createContext from './createContext';
import wrapRoute from '@utils/wrapRoute';

const handler = (req, res) => {
  res.send('Hello World!');
};

const registerRoutes = config => {
  console.log('Registering routes...');

  const router = express.Router();
  const context = createContext(config);

  // router.get('/', handler);
  router.get('/', wrapRoute(context, handler));
  router.get('/test', wrapRoute(context, handler));

  return router;
};

export default registerRoutes;
