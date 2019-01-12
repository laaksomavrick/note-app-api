import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors";

/**
 * Validator for the create handler.
 * A username and password should exist on an incoming request.
 */
export const validateCreate = (
  { body: { auth: { email = null, password = null } = {} } }: Request,
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
