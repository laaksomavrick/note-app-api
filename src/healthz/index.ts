import express from "express";
import Core from "../core";
import { get } from "./handlers";

export default (core: Core) => (app: express.Express) =>
  app.get("/healthz", get(core));
