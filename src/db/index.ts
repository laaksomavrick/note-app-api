import pg from "pg";
import config from "../config";

export interface Database {
  query: (text, params) => Promise<pg.QueryArrayResult>;
}

const pool = new pg.Pool({
  host: config.get("database.host"),
  port: config.get("database.port"),
  user: config.get("database.username"),
  password: config.get("database.password"),
  database: config.get("database.schema"),
});

export const db: Database = {
  query: (text, params) => pool.query(text, params),
};
