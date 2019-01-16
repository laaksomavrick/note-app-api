import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { validateFolderBelongsToUser } from "../folders/middlewares";
import { get } from "./handlers";

/**
 * Module exposing note routes and their handlers
 */
export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.get(
      "/users/:userId/folders/:folderId/notes",
      authorize,
      isUser,
      validateFolderBelongsToUser(core),
      get(core),
    );
  };
};
