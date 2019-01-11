import { camelCase } from "change-case";
import { Database } from "../db";

export interface Folder {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string; // todo Base
}

// todo syntax for select thing, thing2; generic for use across repos
// todo universal get, find, ....
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
