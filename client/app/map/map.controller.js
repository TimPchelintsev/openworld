'use strict';

(function() {

class MapController {

  constructor($scope, $http, map, uiGmapIsReady) {
    var self = this;
    this.$http = $http;
    var generateItem =  function(_id) {
      return {
      id: _id,
      heading: 'Ololo',
      description: 'Trololo kdfjkdjfkdjf jkdj kdjfkdjf kj kj kjdkfjkdfjkdjfkd dkfjdkfjk'
    };};
    this.items = [];
    for (var i = 0; i < [1,2,3,4,5,6,7,8,9,10].length; i++) {
      this.items.push(generateItem(i));
    }
    console.log(this.items);
    self.map = map;
    self.map.getHomes().then(function(response) {
      console.log(response);
      self.map.markers = response;
    });

    console.log(map.center);
    uiGmapIsReady.promise(1).then(function(instances) {
      var _map = instances[0].map;
      // _map.fitBounds(self.map.getWorldBounds());
      map.getUserGeolocationMarker().then(function(marker) {
        self.userLocation = marker;
        self.map.markers.push(marker);
        console.log(self.userLocation);
      });
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('openworldApp')
  .controller('MapController', MapController);

})();
