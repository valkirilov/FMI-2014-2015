'use strict';

angular.module('myApp.services.artists-service', ['restangular'])
.service('ArtistsService', function(Restangular, $http) {

    var artists;
    var baseArtists = Restangular.all('api/artists');

    artists = baseArtists.getList().$object;

    var fetchAll = function() {
        artists = baseArtists.getList().$object;
        return artists;
    };
    var getAll = function() {
        return artists;
    };
    var add = function(artist) {
        return baseArtists.post(artist);
    };
    var deleteAll = function() {
        return $http.delete('api/artists');
    };

    this.fetchAll = fetchAll;
    this.getAll = getAll;
    this.add = add;
    this.deleteAll = deleteAll;
});
