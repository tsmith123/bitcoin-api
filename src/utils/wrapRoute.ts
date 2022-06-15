import { Response, RequestHandler, NextFunction } from 'express';
import { Context, RequestContext } from '@types';

const wrapRoute = (context: Context, handler: RequestHandler) => (req: RequestContext, res: Response, next: NextFunction) => {
  try {
    req.context = context;
    return handler.call(this, req, res, next);
  } catch (e) {
    throw new Error(e);
  }
};

export default wrapRoute;
