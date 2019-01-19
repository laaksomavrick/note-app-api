import { NextFunction, Response } from "express";
import { AuthorizedRequest, Handler, response } from "../api";
import { Core } from "../core";
import { AuthorizedFolderRequest } from "./defs";
import {
  createFolder,
  destroyFolder,
  getFoldersForUser,
  updateFolder,
} from "./repository";

/**
 * Retrieve all folders belonging to a user.
 */
export const get = ({ db }: Core): Handler => {
  return async (
    { userId }: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const folders = await getFoldersForUser(db, userId);
      response(res, { folders });
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Create a new folder.
 */
export const create = ({ db }: Core): Handler => {
  return async (
    {
      body: {
        folder: { name },
      },
      userId,
    }: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const folder = await createFolder(db, { name, userId });
      response(res, { folder });
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Update a folder.
 */
export const update = ({ db }: Core): Handler => {
  return async (
    {
      body: {
        folder: { name = null },
      },
      folderId,
    }: AuthorizedFolderRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const folder = await updateFolder(db, { id: folderId, name });
      response(res, { folder });
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Delete a folder.
 */
export const destroy = ({ db }: Core): Handler => {
  return async (
    { folderId }: AuthorizedFolderRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await destroyFolder(db, folderId);
      response(res, {});
    } catch (error) {
      next(error);
    }
  };
};
