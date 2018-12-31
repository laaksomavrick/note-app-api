import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AuthorizedRequest } from "../api";
import config from "../config";
import { UnauthorizedError, ValidationError } from "../errors";

export const validateCreate = (
  { body: { email = null, password = null } }: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const valid = email !== null && password !== null;
    if (!valid) {
      throw new ValidationError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

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
