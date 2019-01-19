import { Database, getIdFromRows, parseRowsToType, RecordBase } from "../db";

/**
 * Defines the shape of a User
 */
export interface User extends RecordBase {
  email: string;
  password: string;
}

interface InsertUser {
  email: string;
  password: string;
}

/**
 * Inserts a new user record into the database.
 */
export const createUser = async (
  db: Database,
  { email, password }: InsertUser,
): Promise<number> => {
  const { rows } = await db.query(
    `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
    [email, password],
  );
  const id = getIdFromRows(rows);
  return id;
};

/**
 * Finds a user in the database given an id.
 */
export const findUser = async (db: Database, id: number): Promise<User | null> => {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1 LIMIT 1`, [id]);
  const [user = null] = parseRowsToType<User>(rows);
  return user;
};

/**
 * Finds a user in the database given an email.
 */
export const findByEmail = async (db: Database, email: string): Promise<User | null> => {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);
  const [user = null] = parseRowsToType<User>(rows);
  return user;
};
