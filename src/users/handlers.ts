import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest, Handler, response } from "../api";
import { Core } from "../core";
import { find, insert } from "./repository";

/**
 * Creates a user given a unique email and valid password.
 */
export const create = ({ db, crypto }: Core): Handler => {
  return async (
    {
      body: {
        user: { email, password },
      },
    }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hashed = await crypto.hash(password, 10);
      const id = await insert(db, { email, password: hashed });
      const user = await find(db, id);
      response(res, { user });
    } catch (error) {
      next(error);
    }
  };
};

export const me = ({ db }: Core): Handler => {
  return async (
    { userId }: AuthorizedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await find(db, userId);
      response(res, { user });
    } catch (error) {
      next(error);
    }
  };
};
