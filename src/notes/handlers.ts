import { NextFunction, Request, Response } from "express";
import { Handler, response } from "../api";
import { Core } from "../core";
import { AuthorizedFolderRequest } from "../folders/defs";
import { getNotesForFolder, createNote } from "./repository";

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

/**
 * Create a new note.
 */
export const create = ({ db }: Core): Handler => {
  return async (
    {
      body: {
        note: { name, content },
      },
      userId,
      folderId,
    }: AuthorizedFolderRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const note = await createNote(db, { name, content, userId, folderId });
      response(res, { note });
    } catch (error) {
      next(error);
    }
  };
};
