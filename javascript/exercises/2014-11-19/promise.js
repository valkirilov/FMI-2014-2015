
var STATES = require('./states.js');

function Promise() {
	console.log('Promise constructor');
	
	this._done = null;
	this._fail = null;
	this._state = STATES.CLEAN;
	this._resolveData = null;
	this._rejectData = null;
	this._next = null;
}

Promise.prototype.then = function(successCb, failCb) {
	console.log('Then called');
	var self = this;

	if (self._state === STATES.RESOLVED) {
		self._done = successCb(self._resolveData);
	}
	else if (self._state === STATES.REJECTED) {
		self._fail = failCb(self._rejectData);
	}

	self._next = new Promise();
	return self._next;
};

module.exports = Promise;


