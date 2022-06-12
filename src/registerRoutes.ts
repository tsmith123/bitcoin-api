import express from 'express';
import createContext from './createContext';
import wrapRoute from '@utils/wrapRoute';

const handler = (req, res) => {
  console.log(req.context);
  res.send('Hello World!');
};

const registerRoutes = config => {
  console.log('Registering routes...');

  const router = express.Router();
  const context = createContext(config);

  // router.get('/', handler);
  router.get('/', wrapRoute(handler, context));

  return router;
};

export default registerRoutes;
