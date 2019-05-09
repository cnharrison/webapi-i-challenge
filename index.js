// implement your API here
const express = require("express");
const server = express();
server.use(express.json());

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

server.post("/api/users", (req, res) => {
  const { name, bio, created_at, updated_at } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert({
    name,
    bio,
    created_at,
    updated_at
  })
    .then(addedUser => {
      res.status(201).json(addedUser);
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    );
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      res.status(201).json(user);
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: "The users information could not be retrieved." })
    );
});
