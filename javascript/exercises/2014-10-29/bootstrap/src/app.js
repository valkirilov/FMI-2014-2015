/* global Video: false, document: false */

var blackAndWhiteFilter = new CustomFilter();
var vid = new Video(document.getElementById('video'),
  	document.getElementById('canvas'));

vid.addFilter(blackAndWhiteFilter);
vid.start();
