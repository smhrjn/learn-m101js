/* eslint-disable no-console */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/smhrjn';

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log('Successfully connected to server');

  // Find some documents in our collection
  db.collection('moviesScratch').find({}).toArray((err2, docs) => {
    if (err2) return console.log(`Error: ${err}`);

    // Print the documents returned
    docs.forEach((doc) => {
      console.log(doc.title);
    });

    // Close the DB
    db.close();
    return 0;
  });

  // Declare success
  console.log('Called find()');
});
