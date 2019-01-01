import { Response } from "express";

/**
 * Utility function for ensuring common formatting amongst all valid handler responses.
 */
export const response = (res: Response, data: object, status: number = 200): void => {
  res.status(status).send({
    status,
    data,
  });
};

/**
 * Utility function for ensuring common formatting amongst all error responses.
 */
export const responseError = (
  res: Response,
  error: string,
  status: number = 500,
): void => {
  res.status(status).send({
    status,
    error,
  });
};
