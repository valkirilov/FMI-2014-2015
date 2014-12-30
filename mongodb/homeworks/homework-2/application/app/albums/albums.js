'use strict';

angular.module('myApp.albums', ['ngRoute', 'restangular', 'myApp.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/albums', {
    templateUrl: 'albums/albums.html',
    controller: 'AlbumCtrl'
  });
}])

.controller('AlbumCtrl', ['$scope', '$http', 'Restangular', 'AlbumsService', 'ArtistsService', 'StringsGeneratorService', 'UtilsService',
  function($scope, $http, Restangular, AlbumsService, ArtistsService, StringsGeneratorService, UtilsService) {

    $scope.newAlbum = {};

    $scope.albums = AlbumsService.getAll();
    $scope.artists = ArtistsService.getAll();

    $scope.step1 = function(option) {

      switch(option) {
        case 1:
          // Adding artists
          for (var artistIndex=0; artistIndex < 3; artistIndex++)
            $scope.addArtist();

          var artistPanayot = {
              name: "Panayot Panayotov",
              founded: 1854
            };

          $scope.addArtist(artistPanayot);
          break;

        case 2:
          var albumOfPanayot1 = {
            name: "name HIts",
            artist: "Panayot Panayotov",
            released: 2011,
            genres: "pop"
          },
          albumOfPanayot2 = {
            name: "name hits",
            artist: "Panayot Panayotov",
            released: 2008,
            genres: "classic"
          };

          $scope.addAlbum(albumOfPanayot1);
          $scope.addAlbum(albumOfPanayot2);
          
          // Adding albums
          for (var albumIndex=0; albumIndex < 3; albumIndex++)
            $scope.addAlbum();

          break;

      }

    };

    $scope.step2 = function() {
      $http.post('api/albums/name/Panayot Panayotov', { name: 'Panayot Panayotov', genre: 'pop'}).success(function() {
        $scope.albums = AlbumsService.fetchAll();
      });;
    };

    $scope.step3 = function() {
      $http.get('api/albums/from/2001/to/2011').success(function(response) {
        console.log(response);
        $scope.albums = response;
      });;
    };

    $scope.step4 = function() {
      var artist = $scope.artists[UtilsService.getRandom($scope.artists.length-1)];

      AlbumsService.fetchAllByArtsit(artist).then(function(response) {
        $scope.albums = response.data;
        
        alert('Справка за ' + artist.name + "; \nБрой албуми с жанр rock: " + response.data.length);
      });

    };

    $scope.step5 = function() {
      AlbumsService.deleteHits().then(function(response) {
        console.log(response);
        $scope.albums = AlbumsService.fetchAll();
      });
    };

    $scope.addAlbumModal = function() {
      angular.element('#myModal').modal('toggle');
    };

    $scope.fetchAlbums = function() {
      $scope.albums = AlbumsService.fetchAll();
    };

    $scope.addAlbum = function(album) {
      if (album === undefined) {
        album = {};
        album.name = StringsGeneratorService.getAlbumName();
        album.artist = $scope.artists[UtilsService.getRandom($scope.artists.length-1)].name;
        album.released = StringsGeneratorService.getReleased();
        album.genres = StringsGeneratorService.getGenresNames();
        album.rating = StringsGeneratorService.getRandom(10);
      }

      album.genres = album.genres.replace(/(, )/g, '').split(',');

      AlbumsService.add(album).then(function(response) {
        console.log('Added');
        angular.element('#myModal').modal('toggle');
        $scope.albums = AlbumsService.fetchAll();
      });
    };

    $scope.addArtist = function(artist) {
      if (artist === undefined) {
        artist = {};
        artist.name = StringsGeneratorService.getArtistName();
        artist.founded = StringsGeneratorService.getReleased();      
      }

      ArtistsService.add(artist).then(function(response) {
        console.log('Added');
        $scope.artists = ArtistsService.fetchAll();
      });
    };

    $scope.deleteAlbums = function() {
      AlbumsService.deleteAll().then(function() {
        $scope.albums = AlbumsService.fetchAll();
      });
    };

    $scope.deleteArtists = function() {
      ArtistsService.deleteAll().then(function() {
        $scope.artists = ArtistsService.fetchAll();
      });
    };

}]);