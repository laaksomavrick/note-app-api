import config from "../config";

export interface LogArgs {
    url?: string;
    timestamp?: string;
    params?: string;
    message?: string;
    status?: string | number;
    error?: string;
    stack?: string;
    // tslint:disable-next-line:no-any
    info?: any;
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
        const timestamp = new Date().toISOString();
        const meta = { timestamp, ...params };
        console.log(color, JSON.stringify(meta, null, 2));
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
