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

// tslint:disable-next-line:no-any
const query = (text: string, params: any[]): Promise<pg.QueryResult> =>
  pool.query(text, params);

const end = (): Promise<void> => pool.end();

const client = (): Promise<pg.PoolClient> => pool.connect();

const ping = async (): Promise<boolean> => {
  try {
    await db.query("select 1", []);
    return true;
  } catch (e) {
    return false;
  }
};

const transaction = async (
  // tslint:disable-next-line:no-any
  statements: (client: pg.PoolClient) => Promise<any>,
  // tslint:disable-next-line:no-any
): Promise<any> => {
  // Using the same client instance for transactions is required
  // https://node-postgres.com/features/transactions
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await statements(client);
    await client.query("COMMIT");
    return result;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

/**
 * Implementation of the database object used in Core
 */
export const db: Database = {
  query,
  end,
  client,
  ping,
  transaction,
};
