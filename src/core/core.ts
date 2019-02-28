import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import auth from "../auth";
import { db } from "../db";
import folders from "../folders";
import healthz from "../healthz";
import notes from "../notes";
import search from "../search";
import users from "../users";
import { Core } from "./defs";
import { globalErrorHandler } from "./middlewares";

// todo: default request timeout

export const bootstrap = (): Express => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  wireApp(app);
  app.use(globalErrorHandler);
  return app;
};

const wireApp = (app: Express): void => {
  const core: Core = {
    db,
    crypto: bcrypt,
  };
  const routes = [search, notes, folders, users, healthz, auth];
  for (const route of routes) {
    route(core)(app);
  }
};
