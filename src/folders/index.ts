import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { get } from "./handlers";

/**
 * Module exposing folder routes and their handlers.
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get("/users/:userId/folders", authorize, isUser, get(core));
  };
};
