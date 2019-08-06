import { Response } from "express";
import { HttpError } from "../errors";

/**
 * Utility function for ensuring common formatting amongst all valid handler responses.
 */
export const response = (res: Response, resource: object, status: number = 200): void => {
    res.status(status).send({
        status,
        resource,
    });
};

/**
 * Utility function for ensuring common formatting amongst all error responses.
 */
export const responseError = (res: Response, error: HttpError, status: number = 500): void => {
    res.status(status).send({
        status,
        error: {
            msg: error.toString(),
            errors: error.errors,
        },
    });
};
