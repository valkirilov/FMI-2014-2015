var promise = require('./promise.js'),
	STATES = require('./states.js');

function Deferred() {
	this.promise = new promise();
}

Deferred.prototype.resolve = function(data) {
	var self = this;

	self.promise._state = STATES.RESOLVED;
	self.promise._resolveData = data;
};

Deferred.prototype.reject = function(data) {
	var self = this;

	self.promise._state = STATES.REJECTED;
	self.promise._rejectData = data;
};

module.exports = Deferred;