import config from "../../src/config";
import { pool } from "../../src/db"; // todo, move this up
import { create, migrate, seed } from "./commands";

export const main = async (): Promise<void> => {
  try {
    console.log("Starting migrator");
    console.log(config.get("database"));
    console.log("Creating databases");
    await create();
    console.log("Creating tables");
    await migrate();
    console.log("Seeding tables");
    await seed();
  } catch (e) {
    console.error(`An error has occurred running the migrator: ${e}`);
  } finally {
    pool.end();
  }
};

main();
