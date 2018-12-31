import { pool } from "../../src/db"; // todo, move this up
import { migrate } from "./commands";

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
