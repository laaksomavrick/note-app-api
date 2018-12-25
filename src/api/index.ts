import { NextFunction, Request, Response } from "express";
import { Core } from "../core";

export interface IHandlerMap {
  [k: string]: ((
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>);
}

export const routeErrorHandler = (
  fn: ((req: Request, res: Response, next: NextFunction) => Promise<void>),
  core: Core,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (e) {
      const { logger } = core;
      // todo: better log in prod
      logger.error(e.stack);
      next(e);
    }
  };
};

export const inject = (core: Core, handlers: object): IHandlerMap => {
  const keys = Object.keys(handlers);
  const map = {};
  for (const key of keys) {
    const fn = handlers[key];
    const applied = routeErrorHandler(fn(core), core);
    map[key] = applied;
  }
  return map;
};

export const response = (res: Response, data: object): void => {
  res.send({
    status: 200,
    data,
  });
};
