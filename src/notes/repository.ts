import { Database, getIdFromRows, parseRowsToType, RecordBase } from "../db";

export interface Note extends RecordBase {
  name: string;
  content: string;
}

/**
 * Retrieves all the notes belonging to a particular folder.
 */
export const getNotesForFolder = async (
  db: Database,
  folderId: number,
): Promise<Note[]> => {
  const { rows } = await db.query(`SELECT * FROM notes WHERE folder_id = $1`, [folderId]);
  const notes = parseRowsToType<Note>(rows);
  return notes;
};
