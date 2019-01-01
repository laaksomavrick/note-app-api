import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { responseError } from "../api";
import { AuthorizedRequest } from "../api";
import config from "../config";
import { UnauthorizedError } from "../errors";

/**
 * The top level error handler for the app.
 */
export const globalErrorHandler = (
  // tslint:disable-next-line:no-any
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const status = error.status || 500;
  responseError(res, error.toString(), status);
};

/**
 * Middleware used for protecting routes requiring authorization.
 * Checks the incoming request for a JWT. If it exists, populates the userId
 * on the request.
 */
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      headers: { authorization = null },
    } = req;
    if (!authorization) {
      throw new UnauthorizedError();
    }
    const token = authorization.split("Bearer ")[1];
    // tslint:disable-next-line:no-any
    const { id } = (await verify(token, config.get("secret.jwt"))) as any;
    (req as AuthorizedRequest).userId = id;
    next();
  } catch (error) {
    next(error);
  }
};
