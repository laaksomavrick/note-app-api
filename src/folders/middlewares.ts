import { NextFunction, Request, Response } from "express";
import { Handler } from "../api";
import { Core } from "../core";
import { ValidationError } from "../errors";

/**
 * Validates an incoming request for a unique email and valid password.
 */
export const validateFolderInput = async (
  { body: { folder: { name = null } = {} } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid = name !== null;
    if (!valid) {
      throw new ValidationError();
    }
    next();
  } catch (error) {
    next(error);
  }
};
