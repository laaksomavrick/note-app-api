import { Express } from "express";
import { inject } from "../api";
import { Core } from "../core";
import handlers from "./handlers";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    const { create, get } = inject(core, handlers);
    app.get("/users", get);
    app.post("/users", create);
  };
};
