import pg from "pg";
import config from "../config";
import { logError } from "../logger";
import { Database } from "./defs";

// tslint:disable-next-line:max-line-length
// https://stackoverflow.com/questions/48392587/cloud-sql-is-throwing-etimedout-error-when-queried-from-node-js-application-depl
// todo: fix this
export const connection =
    config.get("env") === "production"
        ? {
              host: `/cloudsql/${config.get("database.socketPath")}`,
              user: config.get("database.username"),
              password: config.get("database.password"),
              database: config.get("database.schema"),
          }
        : {
              host: config.get("database.host"),
              port: config.get("database.port"),
              user: config.get("database.username"),
              password: config.get("database.password"),
              database: config.get("database.schema"),
          };

/**
 * The connection object (actually grabs a connection from the pool)
 */
export const pool = new pg.Pool(connection);

// tslint:disable-next-line:no-any
const query = (text: string, params: any[]): Promise<pg.QueryResult> => pool.query(text, params);

const end = (): Promise<void> => pool.end();

const client = (): Promise<pg.PoolClient> => pool.connect();

const ping = async (): Promise<boolean> => {
    try {
        await pool.connect();
        await pool.query("select 1", []);
        return true;
    } catch (e) {
        logError({ error: e });
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
