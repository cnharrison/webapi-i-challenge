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
    const newUser = req.body;
    if (!req.body.name || !req.body.bio) { 
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db.insert(newUser)
    .then(addedUser => { 
        // res.status(201).json(db.findById(1));
        res.status(201).json(addedUser);
    })
    .catch(err => res.status(500).send(err));
});
