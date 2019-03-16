import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import auth from "../auth";
import folders from "../folders";
import healthz from "../healthz";
import notes from "../notes";
import search from "../search";
import users from "../users";
import { Core } from "./defs";
import { globalErrorHandler } from "./middlewares";
import { Database } from "../db";
import { logError } from "../logger";
import config from "../config";

// todo: default request timeout

export const bootstrap = (core: Core): Express => {
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
      },
    });
    process.exit(0);
  }
};

const wireApp = (app: Express, core: Core): void => {
  const routes = [search, notes, folders, users, healthz, auth];
  for (const route of routes) {
    route(core)(app);
  }
};
