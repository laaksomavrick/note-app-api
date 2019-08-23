import pg from "pg";
import config from "../config";
import { logError } from "../logger";
import { Database } from "./defs";

/**
 * DatabaseClient is a wrapper around common database operations for use
 * in application code. The implementation of the interface is a kludge, but previously,
 * a set of functions were exported of the shape "Database", so this was a simple option
 * for refactoring.
 */
export default class DatabaseClient implements Database {

    private readonly config: pg.PoolConfig;

    private pool: pg.Pool;

    constructor() {
        // These fields should be DI'd, but given we're only doing integration tests, it doesn't matter
        // tslint:disable-next-line:max-line-length
        // https://stackoverflow.com/questions/48392587/cloud-sql-is-throwing-etimedout-error-when-queried-from-node-js-application-depl
        // todo: fix this
        this.config =
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

        this.pool = new pg.Pool(this.config);
    }

    // tslint:disable-next-line:no-any
    public async query(text: string, params: any[]): Promise<pg.QueryResult> {
        return this.pool.query(text, params);
    }

    public async end(): Promise<void> {
        await this.pool.end();
    }

    public async client(): Promise<pg.PoolClient> {
        return this.pool.connect();
    }

    public async ping(): Promise<boolean> {
        try {
            await this.pool.connect();
            await this.pool.query("select 1", []);
            return true;
        } catch (e) {
            logError({ error: e });
            return false;
        }
    }

    public async transaction(
        // tslint:disable-next-line:no-any
        statements: (client: pg.PoolClient) => Promise<any>,
        // tslint:disable-next-line:no-any
    ): Promise<any> {
        // Using the same client instance for transactions is required
        // https://node-postgres.com/features/transactions
        const client = await this.pool.connect();
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
    }
}
