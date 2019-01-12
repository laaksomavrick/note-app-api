import pg from "pg";
import config from "../config";
import { Database } from "./defs";

/**
 * The connection object (actually grabs a connection from the pool)
 */
export const pool = new pg.Pool({
  host: config.get("database.host"),
  port: config.get("database.port"),
  user: config.get("database.username"),
  password: config.get("database.password"),
  database: config.get("database.schema"),
});

/**
 * Implementation of the database object used in Core
 */
export const db: Database = {
  // tslint:disable-next-line:no-any
  query: (text: string, params: any[]): Promise<pg.QueryResult> =>
    pool.query(text, params),
  end: (): Promise<void> => pool.end(),
  connect: (): Promise<pg.PoolClient> => pool.connect(),
  ping: async (): Promise<boolean> => {
    try {
      await db.query("select 1", []);
      return true;
    } catch (e) {
      return false;
    }
  },
};
