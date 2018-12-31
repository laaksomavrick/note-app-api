import { Express } from "express";
import { authorize } from "../auth/middleware";
import { Core } from "../core";
import { create, me } from "./handlers";
import { validateCreate } from "./middleware";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.post("/users", validateCreate(core), create(core));
    app.get("/users/me", authorize, me(core));
  };
};
