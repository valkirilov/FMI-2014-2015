
var MagicTable = (function() {

	var tableElement = null,
		currentNumber = 1,
		magicTable = [];

	var init = function(tableSelector) {
		tableElement = $(tableSelector);
	};

	var magic = function() {
		currentNumber++;

		addCol(tableElement, currentNumber);
		addRow(tableElement, currentNumber);
	};

	function addRow(tableElement, currentNumber) {
		var tr = $('<tr></tr>');

		for (var i=0; i<=currentNumber; i++) {
			if (i === 0)
				tr.append('<td>'+currentNumber+'</td>');
			else {
				tr.append('<td>'+i*currentNumber+'</td>');
			}
		}

		tableElement.append(tr);
	}

	function addCol(tableElement, currentNumber) {

		var trs = tableElement.find('tr');

		for (var i=0; i < trs.length; i++) {
			if (i === 0)
				$(trs[i]).append('<td>'+currentNumber+'</td>');
			else 
				$(trs[i]).append('<td>'+i*currentNumber+'</td>');
		}

	}

	return {
		init: init,
		magic: magic
	};

})();

$(document).ready(function() {
	$(document).on('click', '#btn-magic', function() {
		MagicTable.magic();
	});

	var latestTarget = null;

	$(document).on('mouseover', '#table-magic', function(event) {
		if (latestTarget && latestTarget !== $(event.target).parents('tr:first'))
			latestTarget.removeClass('hovered');

		latestTarget = $(event.target).parents('tr:first');
		latestTarget.addClass('hovered');
	});
	$(document).on('mouseleave', '#table-magic', function(event) {
		latestTarget.removeClass('hovered');
	});

	var lastChanged = {
		target: null,
		number: null
	};

	$(document).on('mouseenter', 'td', function(event) {
		console.log(event);
		var suqare = parseInt($(this).html());
		suqare = suqare*suqare;

		if (event.currentTarget.nextSibling) {
			lastChanged.target = event.currentTarget.nextSibling;
			lastChanged.number = event.currentTarget.nextSibling.innerHTML;

			var number = parseInt(event.currentTarget.nextSibling.innerHTML);
			event.currentTarget.nextSibling.innerHTML = suqare;
		}
	});


	$(document).on('mouseleave', 'td', function(event) {
		console.log(event);
		if (lastChanged.target) {
			lastChanged.target.innerHTML = lastChanged.number;

			lastChanged = {};
		}
	});

	MagicTable.init('#table-magic');
});