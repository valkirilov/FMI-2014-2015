'use strict';

angular.module('myApp.services.albums-service', ['restangular'])
.service('AlbumsService', function(Restangular, $http) {

    var albums;
    var baseAlbums = Restangular.all('api/albums');

    albums = baseAlbums.getList().$object;

    var fetchAll = function() {
        albums = baseAlbums.getList().$object;
        return albums;
    };
    var fetchAllByArtsit = function(artist) {
        console.log(artist.name);
        albums = $http.get('/api/albums/artist/'+artist.name);
        return albums;
    };
    var getAll = function() {
        return albums;
    };
    var add = function(album) {
        return baseAlbums.post(album);
    };
    var deleteAll = function() {
        return $http.delete('api/albums');
    };
    var deleteHits = function() {
        return $http.delete('api/albums/hits');
    };

    this.fetchAll = fetchAll;
    this.fetchAllByArtsit = fetchAllByArtsit;
    this.getAll = getAll;
    this.add = add;
    this.deleteAll = deleteAll;
    this.deleteHits = deleteHits;
});
