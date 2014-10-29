var module = require('./tasks.js');

/* Test cases for iteraor() */
// var stopIteration = {};
// var iteratorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));
// console.log('iterator(): ' + module.iterator(iteratorArray, stopIteration));

/* Test cases for rangeMap */
// var doubled = module.rangeMap(1, 3, function (item) { return item + item });
// console.log(doubled);

/* Test cases for getWrap */
// var getWrapTestAttribute = "a";
// var getWrapTestWord = "thingie";
// console.log("getWrap("+getWrapTestAttribute+")("+getWrapTestWord+"): " + module.getWrap(getWrapTestAttribute)(getWrapTestWord));


/* Test cases for getWrapers */
// var getWrappersArray = ["twinkle", "little", "star"];
// console.log("getWrappers("+getWrappersArray+"):");
// var wrappers = module.getWrappers(getWrappersArray);
// wrappers.forEach(function(item) {
// 	console.log(item('test'));
// });

/* Test caes for arithmeticProgression */
var context = {start: 0, step: 2};
var boundArithmeticProgression = module.arithmeticProgression.bind(context);
var twoStep = boundArithmeticProgression();

console.log(twoStep());
console.log(twoStep());

context.step = 15;
console.log(twoStep());
console.log(twoStep());
console.log(twoStep());