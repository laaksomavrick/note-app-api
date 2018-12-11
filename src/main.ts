import express from "express";
let app = express();
const port = 3000;

interface Server {
  db: any;
}

const server: Server = { db: "db" };

const healthz = (server: Server) => (
  req: express.Request,
  res: express.Response,
): void => {
  res.send({
    server: true,
    db: server.db === "db"
  });
};

app.get("/healthz", healthz(server));

// or

const wire = (app: express.Express): express.Express => {
  app.locals.db = "db";
  return app;
};

app = wire(app);

app.get("/healthz2", (req, res) => {
  const { db } = req.app.locals;
  res.send({
    server: true,
    db: db === "db"
  });
});

app.listen(port, () => console.log(`app listening port:${port}`));
