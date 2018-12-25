import { hash } from "bcrypt";
import { Request, Response } from "express";
import { response } from "../api";
import { Core } from "../core";
import { ValidationError } from "../errors";
import { find, insert } from "./repository";

export const get = (
  core: Core,
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    const { db } = core;
    const users = await db.query(`SELECT * FROM users`, []);
    res.send({ users });
  };
};

export const create = ({
  db,
}: Core): ((req: Request, res: Response) => Promise<void>) => {
  return async (
    { body: { email = null, password = null } }: Request,
    res: Response,
  ): Promise<void> => {
    validateCreate(email, password);
    const hashed = await hash(password, 10);
    const id = await insert(db, { email, password: hashed });
    const user = await find(db, id);
    response(res, { user });
  };
};

const validateCreate = (email: string, password: string): void => {
  const valid = email !== null && password !== null && password.length > 8;
  if (!valid) {
    throw new ValidationError();
  }
};
