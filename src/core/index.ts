import winston from "winston";
import { Database } from "../db";

export default interface Core {
  db: Database;
  logger: winston.Logger;
}
