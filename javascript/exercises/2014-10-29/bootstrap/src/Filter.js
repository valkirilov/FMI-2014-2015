function Filter(id) {
  'use strict';
  this.id = id;
}

Filter.prototype.filter = function (canvas) {
  'use strict';
  var ctx = canvas.getContext('2d'),
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height),
      data = imgData.data;
  for (var i = 0; i < data.length; i += 4) {
    this.applyFilter(data, i, canvas);
  }
  ctx.putImageData(imgData, 0, 0);
};

Filter.prototype.applyFilter = function () {
  'use strict';
  throw new Error('Not implemented');
};

// var CustomFilter = (function() {
//   var applyFilter = function(data, index) {
//         var red = data[index],
//         green = data[index + 1],
//         blue = data[index + 2],
//         alpha = data[index + 3];

//     data[index] = data[index+1] = data[index+2] = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
//   };

//   return {
//     applyFilter: applyFilter
//   };
// })();

function CustomFilter() {
  var applyFilter = function(data, index) {
    var red = data[index],
        green = data[index + 1],
        blue = data[index + 2],
        alpha = data[index + 3];

    data[index] = data[index+1] = data[index+2] = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };

  this.applyFilter = applyFilter;
}

CustomFilter.prototype = Object.create(Filter.prototype);
