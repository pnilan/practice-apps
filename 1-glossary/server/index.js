require("dotenv").config();
const express = require("express");
const path = require("path");
const Entry = require('./db');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, req.hostname);
  next();
})

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
  var id = req.params.id;
  var data = req.body;

  Entry.update(id, data, (error, result) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(200).send('Updated record successfully.');
    }
  })
});

app.delete('/api/entries/:id', (req, res) => {
  var id = req.params.id;

  Entry.delete(id, (error, result) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(200).end();
    }
  })
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(500, req.method, req.url, req.hostname);
    res.status(500).send('Whoops! Something went wrong.')
  }
  next();
})

app.all('*', (req, res) => {
  var status = 404;
  console.log(status, req.method, req.url, req.hostname)
  res.status(404).end();
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
