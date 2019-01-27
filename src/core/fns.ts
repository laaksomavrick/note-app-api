import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import auth from "../auth";
import config from "../config";
import { db } from "../db";
import folders from "../folders";
import healthz from "../healthz";
import logger from "../logger";
import notes from "../notes";
import search from "../search";
import users from "../users";
import { Core } from "./defs";
import { globalErrorHandler } from "./middlewares";

// todo: default request timeout
// todo: rename this file core.ts

export const bootstrap = (): Express => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  if (config.get("env") !== "test") {
    app.use(morgan("combined")); // todo write to file in prod
  }
  wireApp(app);
  app.use(globalErrorHandler);
  return app;
};

const wireApp = (app: Express): void => {
  const core: Core = {
    db,
    logger,
    crypto: bcrypt,
  };
  // todo put these in array, inject with loop
  search(core)(app);
  notes(core)(app);
  folders(core)(app);
  users(core)(app);
  healthz(core)(app);
  auth(core)(app);
};
