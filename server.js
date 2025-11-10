// server.js
const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json()); 

let db;

//Routes


app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to my MongoDB API' });
});

// GET /movies -> all movies sorted by title (A→Z)
app.get('/movies', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not connected yet. Try again in a moment.' });

  const movies = [];
  db.collection('movies')
    .find()                    // 1) find
    .sort({ title: 1 })        // 2) sort
    .forEach(doc => movies.push(doc)) // 3) forEach
    .then(() => {              // 4) then
      res.status(200).json(movies);
    })
    .catch(err => {            // 5) catch
      console.error(err);
      res.status(500).json({ error: 'Could not fetch documents' });
    });
});

// GET /movies/:id -> single movie by _id
app.get('/movies/:id', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not connected yet. Try again in a moment.' });

  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ObjectId format' });

  const results = [];
  db.collection('movies')
    .find({ _id: new ObjectId(id) })   // find by id
    .forEach(doc => results.push(doc))
    .then(() => {
      if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });
      res.status(200).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error fetching document' });
    });
});

// POST /movies -> insert a new movie
app.post('/movies', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not connected yet.' });

  const newMovie = req.body; 

  db.collection('movies')
    .insertOne(newMovie)
    .then(result => {
      res.status(201).json({ message: 'Movie added successfully', id: result.insertedId });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Could not insert movie' });
    });
});





connectToDb((err) => {
  if (err) {
    console.log('Failed to connect to MongoDB');
    
  } else {
    db = getDb();
    console.log('DB handle set');
  }

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
});
