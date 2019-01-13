import config from "./config";
import { bootstrap } from "./core";

/**
 * Boot the app :)
 */
const main = async (): Promise<void> => {
  const port = config.get("port") || 3000;
  const app = bootstrap();
  // todo: ping db
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
};

main();
