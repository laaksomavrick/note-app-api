import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../api";
import { ValidationError } from "../errors";

/**
 * Validates an incoming request to search notes.
 */
export const validateSearchInput = async (
  { body: { search: { query = null } = {} } }: AuthorizedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid = query !== null && query.length > 0;
    if (!valid) {
      throw new ValidationError();
    }
    next();
  } catch (error) {
    next(error);
  }
};
