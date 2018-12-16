import express from "express";
import { Core } from "../core";
import { routeErrorHandler } from "../middlewares";
import { get } from "./handlers";

export default (core: Core) => (app: express.Express) => {
  app.get("/users", routeErrorHandler(get(core)));
};
