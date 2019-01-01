import { NextFunction, Request, Response } from "express";
import { Handler, response } from "../api";
import { Core } from "../core";

/**
 * Issues a health check for the various server dependencies (e.g database online)
 */
export const get = ({ db }: Core): Handler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
