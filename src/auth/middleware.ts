import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors";

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
