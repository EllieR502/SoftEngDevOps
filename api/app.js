const sqlite3 = require("sqlite3").verbose();
const password = require("password-hash-and-salt");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 8080;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(
  session({
    secret: ".",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: false },
  })
);

app.use(function (req, res, next) {
  console.log(req.session.user);
  if (req.session.user) {
    return res.send(req.session.user);
  }
  next();
});

//puts tickets on ui
app.get("/tickets", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.all(`SELECT * FROM ticket`, [], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(rows);
  });
});

//get ticket by id
app.get("/ticket", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
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

//delete ticket
app.delete("/ticket", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.run(`DELETE FROM ticket WHERE ticketID = ${req.query.ticketID}`),
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send("error");
      }
    };
  res.send("success");
});

//add user
app.post("/user", (req, res) => {
  console.log("hi");
  password(req.query.password).hash(function (error, hash) {
    console.log(req.query);
    console.log(hash);
    if (error) throw new Error("error");
    let db = new sqlite3.Database("./db/db.sqlite");
    db.run(
      `INSERT INTO user (fullName, project, username, password) VALUES (?, ?, ?, ?)`,
      req.query.fullName,
      req.query.project,
      req.query.username,
      hash,
      (err, rows) => {
        if (err) {
          console.log(err);
        }
        res.send("success");
      }
    );
  });
});

// gets users
app.get("/users", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.all(`SELECT fullName FROM user`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });
});

//post app.post but db.get
app.post("/login", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.get(
    `SELECT password FROM user WHERE username=?`,
    req.query.username,
    (err, row) => {
      if (err) {
        console.log(err);
      }
      console.log(row);
      // check if row is null - doesnt exist
      if (!row) {
        res.status(400).send("user not found");
      } else {
        password(req.query.password).verifyAgainst(
          row.password,
          function (error, verified) {
            if (error) throw new Error("error");
            if (!verified) {
              res.status(403).send("wrong pwd");
            } else {
              req.session.userName = req.query.userName;
              res.send("success");
            }
          }
        );
      }
    }
  );
});

// logging out
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send("logout error");
    } else {
      res.send("logged out");
    }
  });
});

//get projects
app.post("/project", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.all(`SELECT * FROM project`, [], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    let found = false;
    rows.map((project) => {
      if (project.projectID == req.query.project) {
        res.send(project.projectName);
        found = true;
      }
    });
    if (!found) res.send("not found");
  });
});

// gets specific project from db
app.get("/project", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.get(
    `SELECT * FROM project WHERE projectID = ${req.query.projectID}`,
    //but i want to get the names hm
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
});

// gets a project
app.get("/projects", (req, res) => {
  let db = new sqlite3.Database("./db/db.sqlite");
  db.all(`SELECT projectName FROM project`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
