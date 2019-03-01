import config from "../config";

export interface LogArgs {
  url?: string;
  params?: string;
  message?: string;
  status?: string;
  error?: string;
  stack?: string;
}

enum ConsoleColor {
  Red = "\x1b[31m",
  Yellow = "\x1b[33m",
  Green = "\x1b[32m",
  White = "\x1b[37m",
}

const log = (color: ConsoleColor, params: LogArgs): void => {
  // todo: if dev, console. if prod, write to file.
  if (config.get("env") !== "test") {
    console.log(color, JSON.stringify(params, null, 2));
  }
};

/**
 * Logs an error
 */
export const logError = (params: LogArgs): void => {
  log(ConsoleColor.Red, params);
};

/**
 * Logs a warning
 */
export const logWarning = (params: LogArgs): void => {
  log(ConsoleColor.Yellow, params);
};

/**
 * Logs an ok
 */
export const logOk = (params: LogArgs): void => {
  log(ConsoleColor.Green, params);
};

/**
 * Standard log
 */
export const logStd = (params: LogArgs): void => {
  log(ConsoleColor.White, params);
};
