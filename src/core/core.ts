import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import auth from "../auth";
import config from "../config";
import { Database, db } from "../db";
import folders from "../folders";
import healthz from "../healthz";
import { logError, logOk } from "../logger";
import notes from "../notes";
import search from "../search";
import users from "../users";
import { Core } from "./defs";
import { globalErrorHandler } from "./middlewares";

// todo: default request timeout

export const bootstrap = (
  core: Core = {
    db,
    crypto: bcrypt,
  },
): Express => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  wireApp(app, core);
  app.use(globalErrorHandler);
  return app;
};

export const pingDb = async (db: Database): Promise<void> => {
  const ok = await db.ping();
  if (!ok) {
    logError({
      error: "Database connection failed",
      info: {
        host: config.get("database.host"),
        port: config.get("database.port"),
        username: config.get("database.username"),
        db: config.get("database.schema"),
      },
    });
    process.exit(0);
  } else {
    logOk({
      message: "Connected to database successfully",
      info: {
        host: config.get("database.host"),
        port: config.get("database.port"),
        username: config.get("database.username"),
        db: config.get("database.schema"),
      },
    });
  }
};

const wireApp = (app: Express, core: Core): void => {
  const routes = [search, notes, folders, users, healthz, auth];
  for (const route of routes) {
    route(core)(app);
  }
};
