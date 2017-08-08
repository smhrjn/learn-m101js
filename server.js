  /* eslint-disable */

  const express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

  app.engine('html', engines.nunjucks);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    // Handler for internal server errors
    errorHandler = (err, req, res, next) => {
      console.error(err.message);
      console.error(err.stack);
      res.status(500).render('error_template', {
        error: err
      });
      next();
    }

    app.use(errorHandler);

    app.get('/', (req, res) => {
      db.collection('movies').find({}).toArray((err, docs) => {
        res.render('movies', {
          'movies': docs
        });
      });
    });

    app.get('/fruit_picker', (req, res) => {
      res.render('fruitPicker', {
        'fruits': ['apple', 'orange']
      });
    });

    app.post('/favorite_fruit', (req, res, next) => {
      var favorite = req.body.fruit;
      if (typeof favorite == 'undefined') {
        next('Please choose a fruit!');
      } else {
        res.send("Your favorite fruit is " + favorite);
      }
    });

    app.get('/:name', (req, res, next) => {
      var name = req.params.name;
      var getvar1 = req.query.getvar1;
      var getvar2 = req.query.getvar2;
      res.render('hello', {
        name: name,
        getvar1: getvar1,
        getvar2: getvar2
      });
    });

    app.use((req, res) => {
      res.sendStatus(404);
    });

    const server = app.listen(3000, function () {
      const port = server.address().port;
      console.log('Express server listening on port %s.', port);
    });

  });
