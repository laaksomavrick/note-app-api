import express from "express";
import { get } from "./handlers";

export default (app: express.Express): void => {
  app.get("/healthz", get);
};
