import express from "express";

export const get = (req: express.Request, res: express.Response): void => {
  res.send({
    server: true,
  });
};
