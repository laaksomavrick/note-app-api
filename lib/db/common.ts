import fs from "fs";
import path from "path";
import { pool } from "../../src/db"; // todo, move this up

const MIGRATIONS_DIRECTORY = path.join(__dirname, "./migrations");

// todo: up; down; rollback
export const migrate = async (): Promise<void> => {
  const fileNames = await findSqlFileNames(MIGRATIONS_DIRECTORY);
  for (const fileName of fileNames) {
    await runSqlFile(fileName);
  }
};

export const findSqlFileNames = async (
  directory: string,
): Promise<string[]> => {
  const fileNames = await fs.promises.readdir(directory);
  return fileNames.sort();
};

export const runSqlFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(__dirname, `./migrations/${fileName}`);
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  await pool.query(fileContents);
  // todo pull this out b4 seeds
  await pool.query("INSERT INTO migrations (name) VALUES ($1)", [fileName]);
  if (process.env.NODE_ENV !== "test") {
    console.log(`ran ${fileName}`);
  }
};
