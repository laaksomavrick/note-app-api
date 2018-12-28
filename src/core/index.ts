import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import winston from "winston";
import auth from "../auth";
import { Database, db } from "../db";
import healthz from "../healthz";
import logger from "../logger";
import users from "../users";

interface Crypto {
  // tslint:disable-next-line:no-any
  hash: (data: any, saltOrRounds: string | number) => Promise<string>;
  // tslint:disable-next-line:no-any
  compare: (data: any, encrypted: string) => Promise<boolean>;
}

export interface Core {
  db: Database;
  logger: winston.Logger;
  crypto: Crypto;
}

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

const globalErrorHandler = (
  // tslint:disable-next-line:no-any
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const status = error.status || 500;
  res.status(status).send({ error: error.toString(), status });
};
