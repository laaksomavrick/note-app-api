import express from "express";
import config from "./config";
import Core from "./core";
import db from "./db";
import healthz from "./healthz";
import logger from "./logger";
import middlewares from "./middlewares";
import users from "./users";

const app = express();
const port = config.get("port") || 3000;

// maybe pull these out; need to define pre and posts
middlewares(app);

const core: Core = {
  db,
  logger,
};

// routes(app);

users(core)(app);
healthz(core)(app);

app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

// todo consolidate db check and server start into an init
db.query("select 1 + 1 as result", []).then(() => {
  console.log(`Database connection established`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));

// bootstrap = async () => {...}
// bootstrap()
