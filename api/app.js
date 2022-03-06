const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
app.use(cors());

app.get("/tickets", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite"); // so its not hanging lol
  db.all(`SELECT * FROM ticket`, [], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(rows);
    res.send(rows);
  });
});

//get ticket by id
app.get("/ticket", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  console.log(req.query);
  db.get(
    `SELECT * FROM ticket WHERE ticketID = ${req.query.ticketId}`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
});

app.post("/ticket", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.get(
    `INSERT INTO ticket (ticketTitle, assignee, status, description) VALUES (?, ?, ?, ?)`,
    req.query.ticketTitle,
    req.query.assignee,
    req.query.status,
    req.query.description,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send("success");
    }
  );
});

app.post("/project", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.all(`SELECT * FROM project`, [], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    let found = false;
    rows.map((project) => {
      console.log(project);
      if (project.projectID == req.query.project) {
        res.send(project.projectName);
        found = true;
      }
    });
    if (!found) res.send("not found");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
