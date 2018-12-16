import express from "express";
import winston from "winston";
import { Database, db } from "../db";
import healthz from "../healthz";
import logger from "../logger";
import users from "../users";

export interface Core {
  db: Database;
  logger: winston.Logger;
}

export const wireApp = (app: express.Express) => {
  const core: Core = {
    db,
    logger,
  };
  users(core)(app);
  healthz(core)(app);
};
