	
var pubsub = (function PubSub() {

	var events = {};

	var publish = function(eventName, data) {
		events[eventName].forEach(function(item) {
			item();
		});
	};
	var subscribe = function(eventName, callback) {
		if (events[eventName] === undefined) {
			events[eventName] = [];
		}

		events[eventName].push(callback);
	};

	return {
		publish: publish,
		subscribe: subscribe

	};

})();
