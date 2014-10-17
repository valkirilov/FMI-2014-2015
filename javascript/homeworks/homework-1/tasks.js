
module.exports = {

  fib: function(n) {
    if (n === 0) {
      return 1;
    }
    else if (n === 1) {
      return 1;
    }
    else if (n === Infinity) {
      return n;
    }
    else {
      var first = 1;
      var second = 1;
      var current = 1;

      for (var i=3; i<=n; i++) {
        current = first + second;
        first = second;
        second = current;
      }
      return current;
    }
  },
  phiEstimation: function(n) {
    if (n === Infinity)
      return "φ";

    var piN = this.fib(n);
    var piN2 = this.fib(n-1);

    return piN2 / piN;
  },
  reverseWordsOrderInString: function(input) {
    var words = input.split(' ');
    var reversed = words.reverse().toString();

    return reversed.replace(/,/g, ' ');
  },
  reverseWordsInString:function(input) {
    var words = input.split(' ');
    var reversed = '';
    words.forEach(function(word, index) {
      if (index > 0)
        reversed += ' ';
      reversed += reverseString(word);
    });

    return reversed;
  },
  findNthNumber: function(n, arr) {
    var uniqe = filterUniqe(arr);
    var sorted = uniqe.sort(compareByNumber).reverse();

    return sorted[n-1];
  },
  mean: function(arr) {
    var sorted = arr.sort(compareByNumber);
    var bits = sorted.length.toString(2);

    if (bits.charAt(bits.length-1) === '0') {
      return (sorted[Math.floor(sorted.length/2)-1] + sorted[Math.floor(sorted.length/2)]) / 2;
    }
    else {
      return sorted[Math.floor(sorted.length/2)];
    }
  },

};

function reverseString(string) {
  var output = '';
  for (var i = string.length - 1; i >= 0; i--) {
    output += string.charAt(i);
  }

  return output;
}
function compareByNumber(a, b) {
  if (a > b)
    return 1;
  else if (a < b)
    return -1;
  else
    return 0;
}
function filterUniqe(array) {
  var result = [];
  array.forEach(function(item) {
    if (result.indexOf(item) === -1)
      result.push(item);
  });

  return result;
}
