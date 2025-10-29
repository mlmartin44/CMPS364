const express = require('express');
const app = express();

// Define route
app.get('/', (req, res) => {
  res.json({ mssg: "Welcome to my MongoDB API" });
});

// Start server
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
