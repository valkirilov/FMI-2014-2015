var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    promise = require('./promise.js'),
    deferred = require('./deferred.js'),
    Q = require('./q.js');

var pages = require('./routes/pages');

var app = express();
setup_express(pages);

function setup_express(pages) {
    app.use(bodyParser.json());
    
    //app.use(express.static(path.join(__dirname, './')));

    app.get('/', function(req, res) {
        
        var printHello = function() {
            setTimeout(function() {
                console.log('Hello printed.');
            }, 1000);
        };

        var p = promise();
        p.then(function(success) {
            console.log('Then called from the code.. on success');
            console.log(success);
        }, function(error) {
            console.log('Then called from the code.. on error');
            console.log(error);
        });

        res.send('here');
    });
    app.use('/pages', pages);

}

module.exports = app;