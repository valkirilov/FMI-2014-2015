
'use strict';

angular.module('myApp.services.utils-service', [])
.service('UtilsService', function(Restangular, $http) {
    
    var getRandom = function (max) {
        return Math.floor(Math.random() * max);
    };

    this.getRandom = getRandom;
});
