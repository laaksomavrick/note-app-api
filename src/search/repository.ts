import { Database, parseRowsToType } from "../db";
import { Note } from "../notes/repository";

/**
 * Defines the shape of a search input from a request.
 */
export interface SearchInput {
  userId: number;
  query: string;
}

/**
 * Searches notes for records whose contents match the search input
 */
export const searchNotes = async (
  db: Database,
  { query, userId }: SearchInput,
): Promise<Note[]> => {
  const { rows } = await db.query(
    // tslint:disable-next-line:max-line-length
    `SELECT id, user_id, folder_id, name FROM notes WHERE user_id = $1 AND content @@ to_tsquery('english', $2)`,
    [userId, query],
  );
  const notes = parseRowsToType<Note>(rows);
  return notes;
};
