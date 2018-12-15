import express from "express";
import Core from "../core";

export const get = (core: Core) => async (
  req: express.Request,
  res: express.Response,
) => {
  const { knex, logger } = core;
  logger.info({ message: "hello" });
  // todo need to not throw err if db is down
  const dbPing = await knex.raw("select 1");
  res.send({
    server: true,
    db: dbPing !== null,
  });
};
