import { camelCase } from "change-case";
import { Database } from "../db";

/**
 * Defines the shape of a User
 */
export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface InsertUser {
  email: string;
  password: string;
}

/**
 * Inserts a new user record into the database.
 */
export const insert = async (
  db: Database,
  { email, password }: InsertUser,
): Promise<number> => {
  const { rows } = await db.query(
    `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
    [email, password],
  );
  // tslint:disable-next-line:no-any
  const { id } = (rows[0] as any) || null;
  return id;
};

/**
 * Finds a user in the database given an id.
 */
export const find = async (db: Database, id: number): Promise<User | null> => {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id]);
  // tslint:disable-next-line:no-any
  const raw = (rows[0] as any) || null;
  if (!raw) {
    return null;
  }
  // todo pull this out into util fn for coercing <T>
  const user: object = {};
  const keys = Object.keys(raw);
  for (const key of keys) {
    const camelKey = camelCase(key);
    user[camelKey] = raw[key];
  }
  return user as User;
};

/**
 * Finds a user in the database given an email.
 */
export const findByEmail = async (db: Database, email: string): Promise<User | null> => {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);
  // tslint:disable-next-line:no-any
  const raw = (rows[0] as any) || null;
  if (!raw) {
    return null;
  }
  // todo pull this out into util fn for coercing <T>
  const user: object = {};
  const keys = Object.keys(raw);
  for (const key of keys) {
    const camelKey = camelCase(key);
    user[camelKey] = raw[key];
  }
  return user as User;
};
