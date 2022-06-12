import { Request, Response, RequestHandler, NextFunction } from 'express';
import { Context } from '@types';

interface RequestCustom extends Request {
  context: Context;
}

const wrapRoute = (context: Context, handler: RequestHandler) => (req: RequestCustom, res: Response, next: NextFunction) => {
  try {
    req.context = context;
    return handler.call(this, req, res, next);
  } catch (e) {
    throw new Error(e);
  }
};

export default wrapRoute;
