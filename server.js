const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();

let db;

// connect to db first, then start server
connectToDb((err) => {
  if (!err) {
    db = getDb();

    app.listen(4000, () => {
      console.log('✅ Server running on http://localhost:4000');
    });
  } else {
    console.log('❌ Database connection failed');
  }
});

// default route
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to my MongoDB API' });
});

// get all movies, sorted by title (A-Z)
app.get('/movies', (req, res) => {
  let movies = [];

  db.collection('movies')
    .find()                     //  get all docs
    .sort({ title: 1 })         // sort ascending by title
    .forEach(movie => movies.push(movie))  // push into array
    .then(() => {               // once finished
      res.status(200).json(movies);
    })
    .catch(err => {             //handle errors
      res.status(500).json({ error: 'Could not fetch documents' });
    });
});
