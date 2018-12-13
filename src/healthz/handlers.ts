import express from "express";
import Core from "../core";

// tslint:disable-next-line:typedef
export const get = (core: Core) => async (req: express.Request, res: express.Response) => {
  const { knex } = core;
  // todo need to not throw err if db is down
  const dbPing = await knex.raw("select 1");
  res.send({
    server: true,
    db: dbPing !== null,
  });
};
