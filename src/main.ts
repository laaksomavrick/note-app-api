import config from "./config";
import { bootstrap } from "./core";

// tests
// migrations
// seeds
// create user
// auth user
// readme support; makefile commands

const main = async (): Promise<void> => {
  const port = config.get("port") || 3000;
  const app = bootstrap();
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
};

main();
