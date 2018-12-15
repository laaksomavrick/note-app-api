import express from "express";
import config from "./config";
import Core from "./core";
import knex from "./db";
import healthz from "./healthz";
import logger from "./logger";
import middlewares from "./middlewares";

const app = express();
const port = config.get("port") || 3000;

middlewares(app);

const core: Core = {
  knex,
  logger,
};

// routes(app);

healthz(core)(app);

// todo consolidate db check and server start into an init
knex.raw("select 1 + 1 as result").then(() => {
  console.log(`Database connection established`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));

// bootstrap = async () => {...}
// bootstrap()
