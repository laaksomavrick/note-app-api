import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { create, destroy, get, update } from "./handlers";
import {
  validateFolderExists,
  validateFolderInputForCreate,
  validateFolderInputForUpdate,
} from "./middlewares";

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
      validateFolderInputForCreate,
      create(core),
    );
    app.patch(
      "/users/:userId/folders/:folderId",
      authorize,
      isUser,
      validateFolderExists(core),
      validateFolderInputForUpdate,
      update(core),
    );
    app.delete(
      "/users/:userId/folders/:folderId",
      authorize,
      isUser,
      validateFolderExists(core),
      destroy(core),
    );
  };
};
