import bcrypt from "bcrypt";
import config from "./config";
import { bootstrap, Core, pingDb } from "./core";
import { db } from "./db";

/**
 * Boot the app :)
 */
const main = async (): Promise<void> => {
  const port = config.get("port") || 3000;
  const core: Core = {
    db,
    crypto: bcrypt,
  };
  await pingDb(core.db);
  const app = bootstrap(core);
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
};

main();
