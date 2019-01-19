import { NextFunction, Response } from "express";
import { Handler, response } from "../api";
import { Core } from "../core";
import { AuthorizedFolderRequest } from "../folders/defs";
import { AuthorizedNoteRequest } from "./defs";
import { createNote, destroyNote, getNotesForFolder, updateNote } from "./repository";

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

/**
 * Update a note.
 */
export const update = ({ db }: Core): Handler => {
  return async (
    { body: { note: input }, noteId }: AuthorizedNoteRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const note = await updateNote(db, noteId, input);
      response(res, { note });
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Delete a note.
 */
export const destroy = ({ db }: Core): Handler => {
  return async (
    { noteId }: AuthorizedNoteRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await destroyNote(db, noteId);
      response(res, {});
    } catch (error) {
      next(error);
    }
  };
};
