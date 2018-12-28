import config from "./config";
import { bootstrap } from "./core";

// ddd
// ioc/di pattern
// handler/repo
// tests
// migrations
// seeds
// create user
// auth user
// auth middleware
// generic: authorized?; valid?; handle -> service? -> repo; res
// cleanup of todos, organize files, comments on exported fns and files, clean mess
// readme support; makefile commands; explanation

const main = async (): Promise<void> => {
  const port = config.get("port") || 3000;
  const app = bootstrap();
  // todo: ping db
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
};

main();
