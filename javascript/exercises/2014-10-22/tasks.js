module.exports = {
	iterator: function(array, stopIteration) {
		
		if (array.iterator !== undefined) {
			if (array[array.iterator] >= array.length)
				return stopIteration;

			return array[++array.iterator];
		}

		array.iterator = 0;
		return array[array.iterator];
	},
	rangeMap: function(start, end, map) {
		
		function range(start, end) {
  			var array = [];
  			for (var index=start; index<=end; index++) {
  				array.push(index);
  			}
  			return array;
		}

		var array = range(start, end);
		return array.map(map)
	},
	getWrap: function(tag) {
		function createTagElement(tagName, isClosing) {
			return (isClosing === true) ? "</"+tagName+">" : "<"+tagName+">";
		}

		return function(word) { 
			return createTagElement(tag, false) + word + createTagElement(tag, true);
		}
	},
	getWrappers: function(arr) {
		var self = this;
		var results = [];
		
		arr.forEach(function(item) {
			results.push(self.getWrap(item));
		});

		return results;
	},
	arithmeticProgression: function() {
		var current = this.start,
			step = this.step;

		return function() {
			current += step;
			return current;
		};

	}
};