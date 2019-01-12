import { camelCase } from "change-case";
import { Database } from "../db";

// todo syntax for select thing, thing2; generic for use across repos
// todo universal get, find, ....

export interface Folder {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string; // todo Base
}

interface FolderInput {
  name: string;
  userId: number;
}

/**
 * Inserts a new folder record into the database and returns the folder.
 */
export const insert = async (
  db: Database,
  { name, userId }: FolderInput,
): Promise<Folder> => {
  const { rows } = await db.query(
    `INSERT INTO folders (name, user_id) VALUES ($1, $2) RETURNING id`,
    [name, userId],
  );
  // tslint:disable-next-line:no-any
  const { id } = (rows[0] as any) || null;
  return this.find(db, id);
};

/**
 * Finds a folder in the database given an id.
 */
export const find = async (db: Database, id: number): Promise<Folder | null> => {
  const { rows } = await db.query(`SELECT * FROM folders WHERE id = $1 LIMIT 1`, [id]);
  // tslint:disable-next-line:no-any
  const raw = (rows[0] as any) || null;
  if (!raw) {
    return null;
  }
  const folder: Folder = {} as Folder;
  const keys = Object.keys(raw);
  for (const key of keys) {
    const camelKey = camelCase(key);
    folder[camelKey] = raw[key];
  }
  return folder;
};

export const getFoldersForUser = async (
  db: Database,
  userId: number,
): Promise<Folder[] | null> => {
  const { rows } = await db.query(
    `SELECT * FROM folders WHERE user_id = $1 ORDER BY id`,
    [userId],
  );
  if (!rows) {
    return null;
  }
  const folders: Folder[] = [];
  for (const data of rows) {
    const folder = {} as Folder;
    const keys = Object.keys(data);
    for (const key of keys) {
      const camelKey = camelCase(key);
      folder[camelKey] = data[key];
    }
    folders.push(folder);
  }
  return folders;
};
