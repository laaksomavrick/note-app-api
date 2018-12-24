import pg from "pg";
import config from "../config";

export interface Database {
  query: (text, params) => Promise<pg.QueryArrayResult>;
  end: () => Promise<void>;
  ping: () => Promise<boolean>;
}

export const pool = new pg.Pool({
  host: config.get("database.host"),
  port: config.get("database.port"),
  user: config.get("database.username"),
  password: config.get("database.password"),
  database: config.get("database.schema"),
});

export const db: Database = {
  // tslint:disable-next-line:no-any
  query: (text: string, params: any[]): Promise<pg.QueryResult> =>
    pool.query(text, params),
  end: (): Promise<void> => pool.end(),
  ping: async (): Promise<boolean> => {
    try {
      await db.query("select 1", []);
      return true;
    } catch (e) {
      return false;
    }
  },
};
