import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/test', (req: Request, res: Response) => {
  res.send('Test');
});

export default router;
