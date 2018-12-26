import { hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Handler, response } from "../api";
import { Core } from "../core";
import { find, insert } from "./repository";

export const create = ({ db }: Core): Handler => {
  return async (
    { body: { email, password } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hashed = await hash(password, 10);
      const id = await insert(db, { email, password: hashed });
      const user = await find(db, id);
      response(res, { user });
    } catch (error) {
      next(error);
    }
  };
};
