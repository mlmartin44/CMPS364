const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/movies')
      .then((client) => {
        dbConnection = client.db();
        console.log('Connected to MongoDB (movies database)');
        return cb();
      })
      .catch(err => {
        console.error('MongoDB connection failed:', err);
        return cb(err);
      });
  },
  getDb: () => dbConnection
};
