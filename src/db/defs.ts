import pg from "pg";

/**
 * Defines the shape of the database interface app-wide.
 */
export interface Database {
  query: (text, params) => Promise<pg.QueryArrayResult>;
  end: () => Promise<void>;
  connect: () => Promise<pg.PoolClient>;
  ping: () => Promise<boolean>;
}

/**
 * Type aliasing the return type from a db.query.
 */
// tslint:disable-next-line:no-any
export type QueryResult = any[][];

/**
 * Base interface for records returned from the database.
 */
export interface RecordBase {
  createdAt: string;
  updatedAt: string;
}
