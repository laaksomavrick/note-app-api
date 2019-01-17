import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest, Handler } from "../api";
import { Core } from "../core";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors";

/**
 * Validates an incoming request for a name.
 */
export const validateNoteInputForCreate = async (
  { body: { note: { name = null, content = null } = {} } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid =
      name !== null && content !== null && name.length > 0 && content.length > 0;
    if (!valid) {
      throw new ValidationError();
    }
    next();
  } catch (error) {
    next(error);
  }
};
