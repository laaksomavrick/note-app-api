export const routeErrorHandler = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const globalErrorHandler = (error, req, res, next) => {
  res.status(500).send({ error });
};
