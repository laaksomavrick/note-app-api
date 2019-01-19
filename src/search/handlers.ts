import { NextFunction, Response } from "express";
import { AuthorizedRequest, Handler, response } from "../api";
import { Core } from "../core";
import { searchNotes } from "./repository";

/**
 * Retrieve all notes matching the search criteria.
 */
export const get = ({ db }: Core): Handler => {
  return async (
    { body: { search }, userId }: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const notes = await searchNotes(db, { ...search, userId });
      response(res, { notes });
    } catch (error) {
      next(error);
    }
  };
};
