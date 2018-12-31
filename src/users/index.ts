import { Express } from "express";
import { Core } from "../core";
import { create } from "./handlers";
import { validateCreate } from "./middleware";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    app.post("/users", validateCreate(core), create(core));
  };
};
