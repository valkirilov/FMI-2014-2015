
'use strict';

angular.module('myApp.services.strings-generator-service', ['restangular',])
.service('StringsGeneratorService', function(Restangular) {

  var objects = ['Lion', 'Beef', 'Bed', 'Cow' ,'Bananas', 'Hamster', 'Rhino', 'Knife', 'Tiger', 
                   'Phone', 'Dog', 'Bottle', 'Squirrel', 'Crow', 'Apple', 'Sheep', 'Panda', 
                   'Zebra', 'Lamp', 'Giraffe', 'Chicken', 'HITS', 'hits', 'Hits', 'hItS'],
      adjectives = ['impossible', 'inexpensive', 'innocent', 'inquisitive', 'modern', 'mushy', 'odd', 
                    'open', 'outstanding', 'poor', 'powerful', 'prickly', 'puzzled', 'real', 'rich', 
                    'shy', 'sleepy', 'stupid', 'super', 'talented', 'tame', 'tender', 'tough', 
                    'uninterested', 'vast', 'wandering', 'wild', 'wrong', 'HITS', 'hits', 'Hits', 'hItS'],
      firstNames = ['Иван', 'Петър', 'Георги', 'Николай', 'Григор', 'Стамат', 'Евлампи', 'Унуфри', 'Слави', 'Джошуа'],
      secondNames = ['Иванов', 'Петров', 'Георгиев', 'Николаев', 'Григоров', 'Стаматов', 'Евлампиев', 'Унуфриев', 'Трифонов'],
      genres = ['pop', 'rock', 'dance', 'hits', 'rege', 'classic', 'rap'];

  var getRandom = function (max) {
    return Math.floor(Math.random() * max);
  };
  var getRandomYear = function (max) {
    var min = 1950;
    return Math.floor(Math.random()*(max-min+1)+min);
  };

  var getAlbumName = function() {
    var name = adjectives[getRandom(adjectives.length)] + ' ' + objects[getRandom(objects.length)];
    return name;
  };

  var getArtistName = function() {
    var name = firstNames[getRandom(firstNames.length)] + ' ' + secondNames[getRandom(secondNames.length)];
    return name;
  };

  var getReleased = function() {
    return getRandomYear(2015);
  };

  var getGenresNames = function() {
    var names = genres[getRandom(genres.length)] + ',' + genres[getRandom(genres.length)];
    return names;
  };
  
  this.getAlbumName = getAlbumName;
  this.getArtistName = getArtistName;
  this.getReleased = getReleased;
  this.getGenresNames = getGenresNames;
});
