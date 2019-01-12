import { Express } from "express";
import { authorize, Core } from "../core";
import { create, me } from "./handlers";
import { validateUserInput } from "./middlewares";

/**
 * Module exposing user routes and their handlers.
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.post("/users", validateUserInput(core), create(core));
    app.get("/users/me", authorize, me(core));
  };
};
