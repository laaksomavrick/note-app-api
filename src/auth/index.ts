import { Express } from "express";
import { Core } from "../core";
import { create } from "./handlers";
import { validateCreate } from "./middlewares";

/**
 * Module exposing authorization routes and their handlers.
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.post("/auth", validateCreate, create(core));
  };
};
