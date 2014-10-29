var module = require('./tasks.js');

/* Test cases for fib() */
// for (var fibNumber = 1; fibNumber < 15; fibNumber++)
//   console.log("fib("+fibNumber+"): " + module.fib(fibNumber));

/* Test cases for phiEstimation() */
// for (var phiEstimationNumber = 1; phiEstimationNumber < 15; phiEstimationNumber++)
//   console.log("phiEstimation("+phiEstimationNumber+"): " + module.phiEstimation(phiEstimationNumber));

/* Test cases for reverseWordsOrderInString() */
// var reverseWordsOrderInStringTest = "Ala bala tesvam az";
// console.log('reverseWordsOrderInString('+reverseWordsOrderInStringTest+'): ' + module.reverseWordsOrderInString(reverseWordsOrderInStringTest));
//
// reverseWordsOrderInStringTest = "Kiril e lirik";
// console.log('reverseWordsOrderInString('+reverseWordsOrderInStringTest+'): ' + module.reverseWordsOrderInString(reverseWordsOrderInStringTest));
//
// reverseWordsOrderInStringTest = "Foo baz bar baz baz baz";
// console.log('reverseWordsOrderInString('+reverseWordsOrderInStringTest+'): ' + module.reverseWordsOrderInString(reverseWordsOrderInStringTest));

/* Test cases for reverseWordsInString() */
// var reverseWordsInStringTest = "Ala bala tesvam az";
// console.log('reverseWordsInString('+reverseWordsInStringTest+'): ' + module.reverseWordsInString(reverseWordsInStringTest));
//
// reverseWordsInStringTest = "Kiril e lirik";
// console.log('reverseWordsInString('+reverseWordsInStringTest+'): ' + module.reverseWordsInString(reverseWordsInStringTest));
//
// reverseWordsInStringTest = "Foo baz bar baz baz baz";
// console.log('reverseWordsInString('+reverseWordsInStringTest+'): ' + module.reverseWordsInString(reverseWordsInStringTest));


/* Test cases for findNthNumber() */
// var nthNumberArray = [1,3,4,5,6,7,3,4,5,2,3, 3, 4, 3, 4, 3, 4];
// var nthNumber = 3;
// console.log('findNthNumberArray('+nthNumber+', '+nthNumberArray.toString()+'): ' + module.findNthNumber(nthNumber, nthNumberArray));
//
// nthNumber = 5;
// console.log('findNthNumberArray('+nthNumber+', '+nthNumberArray.toString()+'): ' + module.findNthNumber(nthNumber, nthNumberArray));
//
// nthNumber = 6;
// console.log('findNthNumberArray('+nthNumber+', '+nthNumberArray.toString()+'): ' + module.findNthNumber(nthNumber, nthNumberArray));

/* Test cases for mean() */
// var meanArray = [1,2,3,4,5,6,7,9];
// console.log('mean('+meanArray.toString()+'): ' + module.mean(meanArray));
//
// meanArray = [0, 1, 2, 3, 4, 5, 6, 7, 9];
// console.log('mean('+meanArray.toString()+'): ' + module.mean(meanArray));
//
// meanArray = [1];
// console.log('mean('+meanArray.toString()+'): ' + module.mean(meanArray));
//
// meanArray = [];
// console.log('mean('+meanArray.toString()+'): ' + module.mean(meanArray));

/* Tst cases for setBits */
var m = 130,
    n = 26,
    i = 2,
    j = 5;
console.log('setBits(m, n, i, j): ' + module.setBits(m, n, i, j));
