# m101js

## Week 1

* show dbs
* show collections
* show users
* use _database_
* db.movies.find().pretty()
* cursor

   ``` javascript
  var c = db._collection_.find();
  c.objsLeftInBatch();
  var doc = () => { return c.hasNext() ? c.next() : null; };
   c.next();
  doc();
  ```

* db._collection_.drop()
* db._collection_.insertOne(**Object**)
* db._collection_.insertOne({"_id": _id_})
* db._collection_.insertMany(**Array[Object]**)
* db._collection_.insertMany(**Array[Object]**, "ordered": false)
* db._collection_.find({ key: value }).count()

___

## Week 2

* db._collection_.find({ "tomato.meter": 100 }).count()
  >nested document
* db._collection_.find({ "writers": ["adaf", "afadfd"]})
  >exact match, order considered
* db._collection_.find({ "writers.0": "afdafd" }).count()
  >index match
* db._collection_.find({ "writers.0": "afdafd" }, {title: 1, _id: 0}).count()
  >projection - filter data to return
* Query Operators

  ``` javascript
  { runtime: { $gt: 130, $lte: 140 } }
  { "tomato.meter: { $gte: 95 }, runtime: {$gt: 90} }
  { rated: { $in: ["G", "PG"]} }
  { "tomato.meter": { $exists: true } }
  { "tomato.meter": { $type: "string" } }
  { $or: [ { "tomato.meter": { $gt: 100 } } ], { "writer": "adfadf" } }
  { $and: [ { "keyWithDiffValue: value }, { "keyWithDiffValue: otherValue } ] }
  { "awards.text": { $regex: /^Won\s.*Oscar/ } }
  { genres: { $all: ["adfa", "fafad"] } }
  { genres: { $size: 2 } }
  { boxOffice: { $elemMatch: { country: "UK", revenue: { $gt: 15 } } } } // both conditions should match on single element
  ```

* db._collection_.updateOne(**selector**, { $set: { "newKey": "value" } })
  >$unset: remove, $inc: increment value,
* $push: add field, Operators on $push: $each, $slice, $position
* db._collection_.updateMany({ rated: null }, { $unset: { rated: "" } })
* db._collection_.updateOne(**selector**, { $set: detail }, { upsert: true })
* db._collection_.replaceOne(**selector**, **newDocument**)

___

## Week 3

* mongorestore
* mongoimport -d _database_ -c _collection_ _fileName_
  > reads JSON

mongo "mongodb://cluster0-shard-00-00-jxeqq.mongodb.net:27017,cluster0-shard-00-01-jxeqq.mongodb.net:27017,cluster0-shard-00-02-jxeqq.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username m001-student --password m001-mongodb-basics
