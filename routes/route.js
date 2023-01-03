
const app = require('express').Router();
const path = require("path");
let db = require("../db/db.json");
const { writeFile, readFileSync } = require("fs");
const { v4: uuidv4 } = require('uuid');

// Parses the db
app.get("/api/notes", (req, res) => {
  db = JSON.parse(readFileSync("./db/db.json", "utf8"));
  res.json(db);
});

// the route for adding a note to the db
app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  db.push(req.body);
  writeFile('./db/db.json', JSON.stringify(db, null, 4), (err) => {
    err ? console.log(err) : console.log("file created");
  });
  res.send(`Added note ${req.body.name}`);
})

// the route for deleting a not from the db
app.delete('/api/notes/:id', (req, res) => {
  
  const checkId = db.filter((note) => req.params.id !== note.id)

  writeFile('./db/db.json', JSON.stringify(checkId, null, 4), (err) => {
    err ? console.log(err) : console.log("note deleted")
  });
      
  res.send(`Deleted note`);
})

// joins the html witht he json data
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


module.exports = app;