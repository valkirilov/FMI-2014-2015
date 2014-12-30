
var express = require('express'),
    router = express.Router(),
    promise = require('../promise');

module.exports = function() {

    router.get('/', function(req, res) {
        console.log('Here');

        var promise = new Promise();

        res.status(200).send({'ok': 'true'});
    });

    router.get('/test', function(req, res) {
        console.log('Here');
        
        res.status(200).send({'ok': 'teste'});
    });

    return router;
};