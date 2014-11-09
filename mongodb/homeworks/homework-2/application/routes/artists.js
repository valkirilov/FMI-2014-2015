var express = require('express'),
    moment = require('moment'),
    ObjectID = require('mongodb').ObjectID,
    router = express.Router();

function from_database(artist) {
    artist.id = artist._id;
    delete artist._id;

    return artist;
}

function to_database(artist) {
    artist._id  = new ObjectID(artist.id);

    delete artist.id;

    return artist;
}

module.exports = function(database) {

    var artists = database.collection('artists');

    router.get('/', function(req, res) {
        artists.find({}).toArray(function(err, artists) {
            if (err) {
                console.error('Cannot get artists', err);
                return res.status(500).send();
            }

            res.json(artists.map(from_database));
        });
    });

    router.get('/:id', function(req, res) {
        var id = new ObjectID(req.param('id'));

        artists.findOne({_id: id}, function(err, artist) {
            if (err) {
                console.error('Cannot get artsit', err);
                return res.status(500).send();
            }

            res.json(from_database(artist));
        });
    });

    router.post('/', function(req, res) {
        var artist = to_database(req.body);

        artists.insert(artist, function(err) {
            if (err) {
                console.error('Cannot insert artist', err);
                return res.status(500).send();
            }

            res.status(200).send();
        });
    });

    router.delete('/', function(req, res) {
        artists.remove({}, function(err, artists) {
            if (err) {
                console.error('Cannot remove artists', err);
                return res.status(500).send({'ok': 'false'});
            }

            res.status(200).send({'ok': 'true'});
        });
    });

    return router;
};