import { NextFunction, Request, Response } from "express";

// todo: defs; utils;

export type Handler = ((
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>);

export interface AuthorizedRequest extends Request {
  userId: number;
}

export const response = (res: Response, data: object): void => {
  res.send({
    status: 200,
    data,
  });
};
