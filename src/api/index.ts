import { NextFunction, Request, Response } from "express";

export const routeErrorHandler = (
  // tslint:disable-next-line:no-any
  fn: any,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (e) {
      // todo: log error?
      next(e);
    }
  };
};
