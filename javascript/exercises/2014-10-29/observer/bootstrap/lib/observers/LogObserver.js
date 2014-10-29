/* global module, require */

var Observer = require('./Observer'),
    // use fs.writeFileSync(fileName, content)
    fs = require('fs');

function LogObserver(config) {
  'use strict';
  this.config = config;
}

LogObserver.prototype = Object.create(Observer.prototype);

LogObserver.prototype.update = function (title, data) {
  'use strict';
  
  console.log('Update called');

  var currentDate = new Date();
  var fileName = this.config.path + currentDate + '.txt';
  var content = currentDate + " " + title + " " + data;

  fs.writeFileSync(fileName, content);
};

module.exports = LogObserver;

