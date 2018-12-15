import knex from "knex";
import winston from "winston";

export default interface Core {
  knex: knex;
  logger: winston.Logger;
}
