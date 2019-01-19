import { PoolClient } from "pg";
import { Database, getIdFromRows, parseRowsToType, RecordBase } from "../db";

/**
 * The shape of a folder record from the database.
 */
export interface Folder extends RecordBase, FolderInput {}

/**
 * The shape of an input object to create a new folder.
 */
export interface FolderInput {
  name: string;
  userId: number;
}

/**
 * Inserts a new folder record into the database and returns the folder.
 */
export const createFolder = async (
  db: Database,
  { name, userId }: FolderInput,
): Promise<Folder> => {
  const { rows } = await db.query(
    `INSERT INTO folders (name, user_id) VALUES ($1, $2) RETURNING id`,
    [name, userId],
  );
  const id = getIdFromRows(rows);
  return this.findFolder(db, id);
};

/**
 * Finds a folder in the database given an id.
 */
export const findFolder = async (db: Database, id: number): Promise<Folder | null> => {
  const { rows } = await db.query(`SELECT * FROM folders WHERE id = $1 LIMIT 1`, [id]);
  const [folder = null] = parseRowsToType<Folder>(rows);
  return folder;
};

/**
 * Finds all folders belonging to a particular user.
 */
export const getFoldersForUser = async (
  db: Database,
  userId: number,
): Promise<Folder[] | null> => {
  const { rows } = await db.query(
    `SELECT * FROM folders WHERE user_id = $1 ORDER BY id`,
    [userId],
  );
  const folders = parseRowsToType<Folder>(rows);
  return folders;
};

/**
 * Updates a folder given an id.
 */
export const updateFolder = async (
  db: Database,
  { id: folderId, name }: { id: number; name: string },
): Promise<Folder | null> => {
  const { rows } = await db.query(
    `UPDATE folders SET name = $1 WHERE id = $2 RETURNING id`,
    [name, folderId],
  );
  const id = getIdFromRows(rows);
  return this.findFolder(db, id);
};

/**
 * Destroys a folder given an id.
 * // todo: set visible to false instead (soft deletes)?
 */
export const destroyFolder = async (db: Database, folderId: number): Promise<void> => {
  const queries = async (client: PoolClient): Promise<void> => {
    await client.query(`DELETE FROM notes WHERE folder_id = $1`, [folderId]);
    await client.query(`DELETE FROM folders WHERE id = $1`, [folderId]);
  };
  await db.transaction(queries);
};
