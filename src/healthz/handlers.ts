import { Request, Response } from "express";
import { Core } from "../core";

export const get = (
  core: Core,
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    const { db } = core;
    const dbOk = await db.ping();
    res.send({
      server: true,
      db: dbOk,
    });
  };
};
