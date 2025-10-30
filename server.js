const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();

let db;

// ROUTES 
app.get('/', (req, res) => {
  res.json({ mssg: 'Welcome to my MongoDB API' });
});

// GET /movies -> returns all movies sorted by title (A→Z)
app.get('/movies', (req, res) => {
  if (!db) {
    
    return res.status(503).json({ error: 'Database not connected yet. Try again in a moment.' });
  }

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

// CONNECT TO DB, THEN START SERVER
connectToDb((err) => {
  if (err) {
    console.log('Failed to connect to MongoDB');
    
  } else {
    db = getDb();
    console.log('✅ DB handle set');
  }

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
});

