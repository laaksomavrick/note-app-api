import path from "path";
import { pool } from "../../src/db"; // todo, move this up
import { findSqlFileNames, runSqlFile } from "./common";

const MIGRATIONS_DIRECTORY = path.join(__dirname, "./migrations");

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

export const main = async (): Promise<void> => {
  try {
    await migrate();
  } catch (e) {
    console.error(`An error has occurred migrating: ${e}`);
  } finally {
    pool.end();
  }
};

main();
