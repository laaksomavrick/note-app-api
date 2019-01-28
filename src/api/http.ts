import { Response } from "express";

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
export const responseError = (
  res: Response,
  error: Error,
  status: number = 500,
): void => {
  res.status(status).send({
    status,
    error: error.toString(),
  });
};
