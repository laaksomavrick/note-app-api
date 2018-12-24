import { Request, Response } from "express";
import { Core } from "../core";

export const get = (
  core: Core,
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    const { db } = core;
    const users = await db.query(`SELECT * FROM users`, []);
    res.send({ users });
  };
};
