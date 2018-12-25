import { camelCase } from "change-case";
import { Database } from "../db";

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

export const find = async (db: Database, id: number): Promise<User> => {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  // tslint:disable-next-line:no-any
  const raw = (rows[0] as any) || null;
  // todo pull this out into util fn for coercing <T>
  const user: object = {};
  const keys = Object.keys(raw);
  for (const key of keys) {
    const camelKey = camelCase(key);
    user[camelKey] = raw[key];
  }
  return user as User;
};
