import { Express } from "express";
import { inject } from "../api";
import { Core } from "../core";
import { create, get } from "./handlers";

export default (core: Core): ((app: Express) => void) => {
  return (app: Express): void => {
    const injected = inject(core, { create, get });
    app.get("/users", injected.get);
    app.post("/users", injected.create);
  };
};
