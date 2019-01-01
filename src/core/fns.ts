import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import { Express } from "express";
import morgan from "morgan";
import auth from "../auth";
import { db } from "../db";
import healthz from "../healthz";
import logger from "../logger";
import users from "../users";
import { Core } from "./defs";
import { globalErrorHandler } from "./middlewares";

export const bootstrap = (): Express => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("combined")); // todo write to file in prod
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
  users(core)(app);
  healthz(core)(app);
  auth(core)(app);
};
