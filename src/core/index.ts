import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import winston from "winston";
import { Database, db } from "../db";
import healthz from "../healthz";
import logger from "../logger";
import { globalErrorHandler } from "../middlewares";
import users from "../users";

export interface Core {
  db: Database;
  logger: winston.Logger;
}

export const bootstrap = (): express.Express => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("combined")); // todo write to file in prod
  wireApp(app);
  app.use(globalErrorHandler);
  return app;
};

const wireApp = (app: express.Express): void => {
  const core: Core = {
    db,
    logger,
  };
  users(core)(app);
  healthz(core)(app);
};
