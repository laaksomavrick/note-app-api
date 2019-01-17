import { Express } from "express";
import { authorize, Core, isUser } from "../core";
import { validateFolderBelongsToUser } from "../folders/middlewares";
import { create, get } from "./handlers";
import { validateNoteInputForCreate } from "./middlewares";

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
    app.post(
      "/users/:userId/folders/:folderId/notes",
      authorize,
      isUser,
      validateFolderBelongsToUser(core),
      validateNoteInputForCreate,
      create(core),
    );
  };
};
