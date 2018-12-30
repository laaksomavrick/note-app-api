import path from "path";
import { pool } from "../../src/db"; // todo, move this up
import { findSqlFileNames, runSqlFile } from "./common";

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

export const main = async (): Promise<void> => {
  try {
    await seed();
  } catch (e) {
    console.error(`An error has occurred seeding: ${e}`);
  } finally {
    pool.end();
  }
};

main();
