import winston from "winston";
import config from "../config";

// todo: clean up, comments, separate
// todo: log requests, responses in file

const errorStackTracerFormat = winston.format(info => {
  if (info.meta && info.meta instanceof Error) {
    info.message = `${info.message} ${info.meta.stack}`;
  }
  return info;
});

//
// - Write to all logs with level `info` and below to `combined.log`
// - Write all logs error (and below) to `error.log`.
//
const transports =
  config.get("env") !== "test"
    ? [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ]
    : [];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(), // Necessary to produce the 'meta' attribute
    errorStackTracerFormat(),
    winston.format.json(),
  ),
  transports,
});

// todo fix output on tests

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.get("env") === "development") {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

export default logger;
