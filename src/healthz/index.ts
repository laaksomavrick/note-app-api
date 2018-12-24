import { Express } from "express";
import { routeErrorHandler } from "../api";
import { Core } from "../core";
import { get } from "./handlers";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get("/healthz", routeErrorHandler(get(core)));
  };
};
