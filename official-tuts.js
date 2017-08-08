const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const insertDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], (err, result) => {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

  var findDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({ 'a': 3 }).toArray((err, docs) => {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  const updateDocument = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 3 }
      , { $set: { b : 1 } }, (err, result) => {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });
  }

  const removeDocument = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, (err, result) => {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });
  }

  const indexCollection = (db, callback) => {
    db.collection('documents').createIndex(
      { "a": 1 },
        null,
        (err, results) => {
          console.log(results);
          callback();
      }
    );
  };

  insertDocuments(db, () => {
    updateDocument(db, () => {
      removeDocument(db, () => {
        findDocuments(db, () => {
          db.close();
        });
      });
    });
  });
});
