import express from "express";
import Core from "../core";

// pull out core and try catch for all routes
export const get = (core: Core) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { db } = core;
    // todo need to not throw err if db is down
    const dbPing = await db.query("select 1", []);
    res.send({
      server: true,
      db: dbPing !== null,
    });
  } catch (e) {
    next(e);
  }
};
