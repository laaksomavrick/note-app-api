import winston from "winston";
import { Database, db } from "../db";

/**
 * Dependencies shared across the application.
 * Used in a simple DI/IoC pattern (see handlers).
 */
export interface Core {
  db: Database;
  logger: winston.Logger;
  crypto: Crypto;
}

/**
 * The shape of an object responsible for hashing and checking passwords.
 */
export interface Crypto {
  // tslint:disable-next-line:no-any
  hash: (data: any, saltOrRounds: string | number) => Promise<string>;
  // tslint:disable-next-line:no-any
  compare: (data: any, encrypted: string) => Promise<boolean>;
}
