const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const hubsRouter = require("./hubs/hubs-router.js");
const gate = require("./auth/gate-middleware");
const server = express();

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

server.use(logger);
server.use(helmet());
server.use(express.json());

server.get("/free", (req, res) => {
  res.status(200).json({ welcome: "Web 20 Developers!" });
});

server.get("/paid", gate, (req, res) => {
  res.status(200).json({ welcome: "to the mines of Moria" });
});

server.use("/api/hubs", gate, hubsRouter);

function addName(req, res, next) {
  const name = " Web 20 Developers";

  req.teamName = name; //modified properties from the request
  next();
}

server.get("/", addName, (req, res) => {
  const nameInsert = req.TeamName ? ` ${req.TeamName}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(errorHandler);

function errorHandler(error, req, res, next) {
  cosole.log(error);
  res.status(error).json({ message: "you shall not pass" });
}

module.exports = server;
