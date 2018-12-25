import { hash } from "bcrypt";
import { Request, Response } from "express";
import { response } from "../api";
import { Core } from "../core";
import { find, insert } from "./repository";

const get = (core: Core): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    const { db } = core;
    const users = await db.query(`SELECT * FROM users`, []);
    res.send({ users });
  };
};

const create = ({
  db,
}: Core): ((req: Request, res: Response) => Promise<void>) => {
  return async (
    { body: { email, password } }: Request,
    res: Response,
  ): Promise<void> => {
    // todo move to service
    const hashed = await hash(password, 10);
    const id = await insert(db, { email, password: hashed });
    const user = await find(db, id);
    response(res, { user });
  };
};

export default {
  get,
  create,
};
