import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest, Handler } from "../api";
import { Core } from "../core";
import { ForbiddenError, NotFoundError, ValidationError } from "../errors";
import { AuthorizedFolderRequest } from "./defs";
import { findFolder } from "./repository";

/**
 * Validates an incoming request for a name.
 */
export const validateFolderInputForCreate = async (
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

/**
 * Validates an incoming request for a name.
 * // todo: this will likely change to be different than forCreate e.g optionals
 */
export const validateFolderInputForUpdate = async (
  { body: { folder: { name = null } = {} } }: AuthorizedFolderRequest,
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

/**
 * Validates an incoming request to verify the folderId exists and belongs
 * to the user, setting the folderId on the request object.
 */
export const validateFolderBelongsToUser = ({ db }: Core): Handler => {
  return async (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        params: { folderId, userId },
      } = req;
      const folder = await findFolder(db, folderId);
      if (!folder) {
        throw new NotFoundError();
      }
      if (folder.userId !== parseInt(userId, 10)) {
        throw new ForbiddenError();
      }
      (req as AuthorizedFolderRequest).folderId = folderId;
      next();
    } catch (error) {
      next(error);
    }
  };
};
