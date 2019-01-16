import { NextFunction, Request, Response } from "express";
import { Handler, response } from "../api";
import { Core } from "../core";
import { AuthorizedFolderRequest } from "../folders/defs";
import { getNotesForFolder } from "./repository";

/**
 * Retrieve all notes belonging to a folder.
 */
export const get = ({ db }: Core): Handler => {
  return async (
    { folderId }: AuthorizedFolderRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const notes = await getNotesForFolder(db, folderId);
      response(res, { notes });
    } catch (error) {
      next(error);
    }
  };
};
