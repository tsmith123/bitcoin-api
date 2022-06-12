import { Request, Response, NextFunction } from 'express';

interface RequestCustom extends Request {
  context: string;
}

const wrapRoute = (routeHandler, context) => (req: RequestCustom, res: Response, next: NextFunction) => {
  try {
    req.context = context;
    return routeHandler.call(this, req, res, next);
  } catch (e) {
    next(e);
  }
};

export default wrapRoute;
