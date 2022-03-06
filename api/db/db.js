const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS project (projectID INTEGER PRIMARY KEY AUTOINCREMENT, projectName TEXT NOT NULL);`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS ticket (ticketID INTEGER PRIMARY KEY AUTOINCREMENT, ticketTitle TEXT NOT NULL, assignee INTEGER, status TEXT NOT NULL, description TEXT, FOREIGN KEY(assignee) REFERENCES user(userID));`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS user (userID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT NOT NULL, project TEXT NOT NULL, FOREIGN KEY(project) REFERENCES project(projectID));`
  );
  db.run(`INSERT INTO project (projectName) VALUES ("First Project")`);
  db.run(`INSERT INTO user (userName, project) VALUES ("Ellie", 1)`);
  db.run(
    `INSERT INTO ticket (ticketTitle, assignee, status, description) VALUES ("First Ticket", "Ellie", "To Do", "some description")`
  );
});

db.close();
