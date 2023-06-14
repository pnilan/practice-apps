require("dotenv").config();
const express = require("express");
const path = require("path");
const Entry = require('./db');

const app = express();

// Serves up all static and generated assets in in a specified folder.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
// app.use(express.urlencoded())

app.get('/api/entries', (req, res) => {
  Entry.getAll((error, result) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.send(result);
    }
  });
});

app.post('/api/entries', (req, res) => {
  var entry = req.body;

  Entry.create(entry, (error, result) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(201).send('Added glossary entry to db');
    }
  });
});

app.put('/api/entries/:id', (req, res) => {

});

app.delete('/api/entries/:id', (req, res) => {

});



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
