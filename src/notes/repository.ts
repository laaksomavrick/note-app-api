import { Database, getIdFromRows, parseRowsToType, RecordBase } from "../db";

/**
 * The shape of a note record from the database.
 */
export interface Note extends RecordBase, NoteInput {}

/**
 * The shape of an input object to create a new note.
 */
export interface NoteInput {
  name: string;
  content: string;
  userId: number;
  folderId: number;
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

/**
 * Creates a new note record into the database and returns the note.
 */
export const createNote = async (
  db: Database,
  { name, content, userId, folderId }: NoteInput,
): Promise<Note> => {
  const { rows } = await db.query(
    `INSERT INTO
      notes (name, content, user_id, folder_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
    [name, content, userId, folderId],
  );
  const id = getIdFromRows(rows);
  return this.findNote(db, id);
};

/**
 * Finds a note in the database given an id.
 */
export const findNote = async (db: Database, id: number): Promise<Note | null> => {
  const { rows } = await db.query(`SELECT * FROM notes WHERE id = $1 LIMIT 1`, [id]);
  const [note = null] = parseRowsToType<Note>(rows);
  return note;
};
