
const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017')
      .then((client) => {
        dbConnection = client.db('Movies'); 
        console.log('Connected to MongoDB db=Movies');
        cb();
      })
      .catch(err => {
        console.error(' MongoDB connection failed:', err);
        cb(err);
      });
  },
  getDb: () => dbConnection
};
