import bodyParser from "body-parser";
import express from "express";
import config from "./config";
import Core from "./core";
import db from "./db";
import healthz from "./healthz";

const app = express();
const port = config.get("port") || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const core: Core = {
  knex: db,
};

// middlewares(app);
// routes(app);

healthz(core)(app);

// todo consolidate db check and server start into an init
db.raw("select 1 + 1 as result").then(() => {
  console.log(`Database connection established`);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
