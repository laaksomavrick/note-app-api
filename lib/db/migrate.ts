import { pool } from "../../src/db"; // todo, move this up
import { migrate } from "./common";

// todo seed.ts; move common fns to common.ts

export const main = async (): Promise<void> => {
  try {
    await migrate();
  } catch (e) {
    console.error(`An error has occurred: ${e}`);
  } finally {
    pool.end();
  }
};

main();
