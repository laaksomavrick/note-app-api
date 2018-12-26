import { NextFunction, Request, Response } from "express";
import { response } from "../api";
import { Core } from "../core";

export const get = ({
  db,
}: Core): ((
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dbOk = await db.ping();
      const healthz = {
        server: true,
        db: dbOk,
      };
      response(res, healthz);
    } catch (error) {
      next(error);
    }
  };
};
