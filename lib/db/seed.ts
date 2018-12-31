import { pool } from "../../src/db"; // todo, move this up
import { seed } from "./commands";

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
