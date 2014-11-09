var express = require('express'),
    moment = require('moment'),
    ObjectID = require('mongodb').ObjectID,
    router = express.Router();

function from_database(album) {
    album.id = album._id;
    delete album._id;

    return album;
}

function to_database(album) {
    album._id  = new ObjectID(album.id);
    //task.date = moment(task.date).toDate();

    delete album.id;

    return album;
}

module.exports = function(database) {

    var albums = database.collection('albums');

    router.get('/', function(req, res) {
        albums.find({}).toArray(function(err, albums) {
            if (err) {
                console.error('Cannot get albums', err);
                return res.status(500).send();
            }

            res.json(albums.map(from_database));
        });
    });

    router.get('/artist/:artist', function(req, res) {
        var artist = req.param('artist');

        albums.find({
            artist: artist,
            genres: { $in: ['rock'] }
        }).toArray(function(err, albums) {
            if (err) {
                console.error('Cannot get albums', err);
                return res.status(500).send();
            }

            res.json(albums.map(from_database));
        });
    });

    router.get('/from/:from/to/:to', function(req, res) {
        var from = parseInt(req.param('from')),
            to = parseInt(req.param('to'));

        albums.find({
            released: {
                $gte: from,
                $lt: to,
            }
        }).sort({
            name: -1,
        }).toArray(function(err, albums) {
            if (err) {
                console.error('Cannot get albums', err);
                return res.status(500).send();
            }

            res.json(albums.map(from_database));
        });
    });

    router.post('/', function(req, res) {
        var album = to_database(req.body);

        albums.insert(album, function(err) {
            if (err) {
                console.error('Cannot insert album', err);
                return res.status(500).send('{ "ok": "false"}');
            }

            res.status(200).send('{ "ok": "true"}');
        });
    });

    router.post('/name/:name', function(req, res) {
        var name = req.param('name'),
            genre = req.body.genre;

        albums.update({ 
            artist: name }, { 
                $set: { favorite: true },
                $addToSet: { genres: genre }
            }, { w:1, multi: true}, function(err) {
            if (err) {
                console.error('Cannot update task', err);
                return res.status(500).send('{ "ok": "false"}');
            }

            res.status(200).send('{ "ok": "true"}');
        });
    });

    router.delete('/', function(req, res) {
        albums.remove({}, function(err, albums) {
            if (err) {
                console.error('Cannot remove albums', err);
                return res.status(500).send({'ok': 'false'});
            }

            res.status(200).send({'ok': 'true'});
        });
    });

    router.delete('/hits', function(req, res) {
        var word = req.param('word');

        albums.remove({"name": /hits/i}, function(err, albums) {
            if (err) {
                console.error('Cannot remove albums', err);
                return res.status(500).send({'ok': 'false'});
            }

            res.status(200).send({'ok': 'true'});
        });
    });

    return router;
};