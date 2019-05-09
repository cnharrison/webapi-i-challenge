// implement your API here
const express = require("express");
const server = express();

const db = require("./data/db.js");

server.listen(9090, () => {
  console.log("server listening on port 9090 😂💯👌");
});

server.get("/", (req, res) => {
  res.send("<h1>🙈🙉🙊🐵my server🐵🙊🙉🙈</h1>");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).send(err));
});
