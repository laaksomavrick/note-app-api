import { NextFunction, Request, Response } from "express";

/**
 * Type defining the function signature of handlers or middlewares.
 */
export type Handler = ((
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>);

/**
 * Interface defining the shape of a request which has a userId associated with it.
 * Used post authorization middleware.
 */
export interface AuthorizedRequest extends Request {
  userId: number;
}
