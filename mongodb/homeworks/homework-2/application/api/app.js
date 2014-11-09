var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var albums = require('./routes/albums');
var artists = require('./routes/artists');

var app = express();

MongoClient.connect('mongodb://localhost/disco', function(err, db) {
    if (err) {
        console.error('Cannot connect to the database', err);
        return;
    }

    setup_express(albums(db), artists(db));
});


function setup_express(albums, artists) {
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../app')));
    console.log('Public folder for the client set to be app/');

    console.log('');
    console.log('API endpints: ');
    app.use('/api/albums', albums);
    console.log('/api/albums');

    app.use('/api/artists', artists);
    console.log('/api/artists');

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;