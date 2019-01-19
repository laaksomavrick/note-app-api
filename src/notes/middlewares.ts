import { NextFunction, Request, Response } from "express";
import { Handler } from "../api";
import { Core } from "../core";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors";
import { AuthorizedFolderRequest } from "../folders/defs";
import { AuthorizedNoteRequest } from "./defs";
import { findNote } from "./repository";

/**
 * Validates an incoming request to create a note.
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

/**
 * Validates an incoming request to update a note.
 */
export const validateNoteInputForUpdate = async (
  { body: { note: { name = null, content = null } = {} } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const valid =
      (name !== null && name.length > 0) || (content !== null && content.length > 0);
    if (!valid) {
      throw new ValidationError();
    }
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Validates an incoming request to verify the noteId exists and belongs
 * to the user, setting the noteId on the request object.
 */
export const validateNoteBelongsToUser = ({ db }: Core): Handler => {
  return async (
    req: AuthorizedFolderRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        params: { userId, noteId },
      } = req;
      const note = await findNote(db, noteId);
      if (!note) {
        throw new NotFoundError();
      }
      if (note.userId !== parseInt(userId, 10)) {
        throw new ForbiddenError();
      }
      (req as AuthorizedNoteRequest).noteId = noteId;
      next();
    } catch (error) {
      next(error);
    }
  };
};
