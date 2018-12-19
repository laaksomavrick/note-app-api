import fs from "fs";
import path from "path";
import { pool } from "../../src/db"; //todo, move this up

// todo seed.ts; move common fns to common.ts

const MIGRATIONS_DIRECTORY = path.join(__dirname, "./migrations");

// todo: up; down; rollback
const main = async (): Promise<void> => {
  try {
    const fileNames = await findSqlFileNames();
    for (const fileName of fileNames) {
      await runSqlFile(fileName);
    }
  } catch (e) {
    console.error(`An error has occurred: ${e}`);
  } finally {
    await pool.end();
  }
};

const findSqlFileNames = async (): Promise<string[]> => {
  const fileNames = await fs.promises.readdir(MIGRATIONS_DIRECTORY);
  return fileNames.sort();
};

const runSqlFile = async (fileName: string): Promise<void> => {
  const filePath = path.join(__dirname, `./migrations/${fileName}`);
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  await pool.query(fileContents);
  await pool.query("INSERT INTO migrations (name) VALUES ($1)", [fileName]);
};

main();
