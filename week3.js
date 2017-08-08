const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', (err, db) => {
  assert.equal(err, null);
  console.log('connected to DB');

  const query = {'category_code': 'biotech'};
  const projection = {'name': 1, 'category_code': 1, '_id': 0};

  var cursor = db.collection('companies').find(query);
  cursor.project(projection);

  cursor.forEach(doc => {
      console.log('Document: ' + JSON.stringify(doc));
      console.log(doc.name + ' is a ' + doc.category_code + ' company.');
    },
    err => {
      assert.equal(err, null);
      return db.close();
    }
  );
});
