import fs from "fs";
import { pool } from "../../src/db"; // todo, move this up

export const findSqlFileNames = async (directory: string): Promise<string[]> => {
  const fileNames = await fs.promises.readdir(directory);
  return fileNames.sort();
};

export const runSqlFile = async (
  filePath: string,
  afterFn?: () => Promise<void>,
): Promise<void> => {
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  await pool.query(fileContents);
  if (afterFn) {
    await afterFn();
  }
};
