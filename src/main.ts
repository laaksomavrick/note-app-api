import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import config from "./config";
import { wireApp } from "./core";
import { globalErrorHandler } from "./middlewares";

const bootstrap = async () => {
  const app = express();
  const port = config.get("port") || 3000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("combined")); // todo write to file in prod

  wireApp(app);

  app.use(globalErrorHandler);

  await app.listen(port);
  console.log(`Server started on port: ${port}`);
};

bootstrap();
