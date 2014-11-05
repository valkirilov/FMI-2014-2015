'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',

  'myApp.view1',
  'myApp.view2',
  'myApp.version',

  //'restangular',
  'ui.bootstrap',
  //'chieffancypants.loadingBar',
  'gettext',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.controller('GlobalController', ['$scope', '$rootScope', '$location', 'gettextCatalog',
  function($scope, $rootScope, $location, gettextCatalog) {

  $scope.lang = "en";

  $scope.setLanguage = function(language) {
      alert('Setting ' + language);
      $scope.lang = language;
      gettextCatalog.currentLanguage = language;
  };

}]);