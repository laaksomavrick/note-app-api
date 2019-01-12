import { NextFunction, Request, Response } from "express";
import { Handler } from "../api";
import { Core } from "../core";
import { ValidationError } from "../errors";
import { findByEmail } from "./repository";

/**
 * Validates an incoming request for a unique email and valid password.
 */
export const validateUserInput = ({ db }: Core): Handler => {
  return async (
    { body: { user: { email = null, password = null } = {} } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // todo email regexp check
      const valid = email !== null && password !== null && password.length > 8;
      if (!valid) {
        throw new ValidationError();
      }
      const alreadyExists = await findByEmail(db, email);
      if (alreadyExists) {
        throw new ValidationError();
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
