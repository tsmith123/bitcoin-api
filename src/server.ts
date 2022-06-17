import express from 'express';
import registerRoutes from './registerRoutes';
import config from './config';

const { APP_NAME, PORT } = process.env;

const app = express();
const port = PORT || 3000;

app.use('/v1', registerRoutes(config));

app.listen(port, () => {
  console.log(`${APP_NAME || 'Nodana'} listening on port ${port}`);
});
