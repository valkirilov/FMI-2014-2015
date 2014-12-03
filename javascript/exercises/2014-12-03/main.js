
var BRICK_TYPE = {
	VISITED: 2,
	SOLVED: 3,
	OUTSIDE: undefined
};

	var mazeElement = null;
	var cellCounter = 0,
		isSolved = false;

	var init = function(mazeElementSelector, mazeArray) {
		mazeElement = $(mazeElementSelector);

		mazeElement.html('');
		mazeArray.forEach(function(row, index) {
			generateTr(mazeElement, row, index);
		});
	};

	function generateTr(table, rowValues, rowIndex) {
		var trElement = $('<tr></tr>');
		rowValues.forEach(function(value, colIndex) {
			trElement.append(generateTd(value, rowIndex, colIndex));
		});
		table.append(trElement);
	}
	function generateTd(elementValue, rowIndex, colIndex) {
		var className = getClassName(elementValue);
		var element = $('<td id="cell-'+rowIndex+'-'+colIndex+'" class="'+className+'" data-old-class="'+className+'"></td>');

		return element;
	}

	function getClassName(value) {
		switch(value) {
			case 0: return 'brick-wall';
			case 1: return 'brick-empty';
			case 2: return 'brick-visited';
			case 3: return 'brick-finish';
		}
	}

	function renderCell(value, rowIndex, colIndex) {
		var element = $('#cell-'+rowIndex+'-'+colIndex),
			newClass = getClassName(value);

		element.removeClass(element.attr('data-old-class'));
		element.attr('data-old-class', newClass);
		element.addClass(newClass);
	}

	var render = function(mazeArray) {
		mazeArray.forEach(function(row, rowIndex) {
			row.forEach(function(cell, colIndex) {
				renderCell(cell, rowIndex, colIndex);
			});
		});
	};

	var solve = function(mazeArray, position) {
		if (mazeArray[position.row][position.col] === BRICK_TYPE.SOLVED)
			return;

		if (mazeArray[position.row][position.col] === BRICK_TYPE.OUTSIDE)
			return;

		mazeArray[position.row][position.col] = BRICK_TYPE.VISITED;

		solve(mazeArray);

	};

	return {
		init: init,
		render: render,
		solve: solve,
		isSolved: isSolved
	};

})();

$(document).ready(function() {

	var mazeArrayStart = [[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						 [1,1,0,1,1,1,0,1,0,1,1,1,1,1,0],
						 [0,1,1,1,1,0,0,1,0,1,1,1,0,1,0],
						 [0,1,0,0,0,0,0,1,0,1,1,1,0,1,0],
						 [0,1,0,1,0,0,1,1,0,1,1,1,0,1,0],
						 [0,1,0,1,1,0,1,1,0,1,1,1,0,1,0],
						 [0,1,0,1,1,1,1,1,0,1,1,1,0,1,0],
						 [0,1,0,1,0,0,1,0,0,1,0,0,0,1,0],
						 [0,1,0,1,0,0,1,0,0,1,0,0,0,1,0],
						 [0,1,0,1,0,0,1,0,0,1,0,1,1,1,0],
						 [0,1,0,1,1,1,1,0,0,1,0,1,1,1,0],
						 [0,1,1,1,1,0,1,1,1,1,1,1,1,0,0],
						 [0,0,0,0,0,0,0,1,1,1,0,1,1,1,3]];

	Maze.init("#table-maze", mazeArrayStart);
	Maze.render(mazeArrayStart);

	var mazeStep = mazeArrayStart;
	while (!Maze.isSolved) {
		mazeStep = Maze.solve(mazeStep, { row: 0, col:0 });
		Maze.render(mazeStep);
	}

});



