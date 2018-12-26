import { Express } from "express";
import { Core } from "../core";
import { get } from "./handlers";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get("/healthz", get(core));
  };
};
