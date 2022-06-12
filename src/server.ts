import express from 'express';
import registerRoutes from './registerRoutes';

import config from './config';

const app = express();
const port = 3000;

app.use('/v1', registerRoutes(config));

app.listen(port, () => {
  console.log(`Nodefly listening on port ${port}`);
});
