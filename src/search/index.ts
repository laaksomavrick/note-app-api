import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { get } from "./handlers";
import { validateSearchInput } from "./middlewares";

/**
 * Module exposing search routes and their handlers
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get(
      "/users/:userId/notes/search",
      authorize,
      isUser,
      validateSearchInput,
      get(core),
    );
  };
};
