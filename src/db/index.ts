import knex from "knex";
import config from "../config";

export default knex({
  client: "pg",
  connection: {
    host: config.get("database.host"),
    user: config.get("database.username"),
    password: config.get("database.password"),
    database: config.get("database.schema"),
  },
  pool: {
    min: 2,
    max: 10,
  },
  debug: config.get("env") !== "production",
});
