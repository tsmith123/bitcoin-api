import { Response } from 'express';
import { RequestContext } from '@types';

export const getRoot = (req: RequestContext, res: Response) => {
  res.send('Hello Worlds');
};

export const getTest = (req: RequestContext, res: Response) => {
  res.send('Test 123');
};
