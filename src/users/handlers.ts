import express from "express";
import { Core } from "../core";

export const get = (core: Core) => async (
  req: express.Request,
  res: express.Response,
) => {
  const { db } = core;
  const users = await db.query(`SELECT * FROM users`, []);
  res.send({ users });
};
