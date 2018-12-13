import bodyParser from "body-parser";
import express from "express";
import config from "./config";
import healthz from "./healthz";

const app = express();
const port = config.get("port") || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middlewares(app);
// routes(app);

healthz(app);

app.listen(port, () => console.log(`Server started on port: ${port}`));
