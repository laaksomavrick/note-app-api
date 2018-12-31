import fs from "fs";
import path from "path";
import { pool } from "../../src/db"; // todo, move this up

const MIGRATIONS_DIRECTORY = path.join(__dirname, "./migrations");
const SEEDS_DIRECTORY = path.join(__dirname, "./seeds");

export const seed = async (): Promise<void> => {
  const fileNames = await findSqlFileNames(SEEDS_DIRECTORY);
  for (const fileName of fileNames) {
    const filePath = path.join(__dirname, `./seeds/${fileName}`);
    await runSqlFile(filePath);
    if (process.env.NODE_ENV !== "test") {
      console.log(`ran ${fileName}`);
    }
  }
};

// todo: up; down; rollback
export const migrate = async (): Promise<void> => {
  const fileNames = await findSqlFileNames(MIGRATIONS_DIRECTORY);
  for (const fileName of fileNames) {
    const filePath = path.join(__dirname, `./migrations/${fileName}`);
    const insertMigrationHistory = async (): Promise<void> => {
      await pool.query("INSERT INTO migrations (name) VALUES ($1)", [fileName]);
    };
    await runSqlFile(filePath, insertMigrationHistory);
    if (process.env.NODE_ENV !== "test") {
      console.log(`ran ${fileName}`);
    }
  }
};

const findSqlFileNames = async (directory: string): Promise<string[]> => {
  const fileNames = await fs.promises.readdir(directory);
  return fileNames.sort();
};

const runSqlFile = async (
  filePath: string,
  afterFn?: () => Promise<void>,
): Promise<void> => {
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  await pool.query(fileContents);
  if (afterFn) {
    await afterFn();
  }
};
