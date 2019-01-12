import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { create, get } from "./handlers";
import { validateFolderInput } from "./middlewares";

/**
 * Module exposing folder routes and their handlers.
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get("/users/:userId/folders", authorize, isUser, get(core));
    app.post(
      "/users/:userId/folders",
      authorize,
      isUser,
      validateFolderInput,
      create(core),
    );
  };
};
