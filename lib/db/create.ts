import { pool } from "../../src/db"; // todo, move this up
import { create } from "./commands";

export const main = async (): Promise<void> => {
  try {
    await create();
  } catch (e) {
    console.error(`An error has occurred creating: ${e}`);
  } finally {
    pool.end();
  }
};

main();
