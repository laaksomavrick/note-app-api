import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

export default (app: express.Express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("combined")); // todo write to file in prod
};
