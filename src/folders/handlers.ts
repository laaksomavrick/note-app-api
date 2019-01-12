import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest, Handler, response } from "../api";
import { Core } from "../core";
import { getFoldersForUser, insert } from "./repository";

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
      const folder = await insert(db, { name, userId });
      response(res, { folder });
    } catch (error) {
      next(error);
    }
  };
};
