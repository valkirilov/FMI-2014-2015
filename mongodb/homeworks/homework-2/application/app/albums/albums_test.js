'use strict';

describe('myApp.albums module', function() {

  beforeEach(module('myApp.albums'));

  describe('album controller', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var albumCtrl = $controller('AlbumCtrl');
      expect(albumCtrl).toBeDefined();
    }));

  });
});