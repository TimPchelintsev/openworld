'use strict';

(function() {

class MapController {

  constructor($scope, $http, map, uiGmapIsReady) {
    var self = this;
    this.$http = $http;
    this.draggableOptions = {
      cursor: 'move'
    };
    self.map = map;
    self.map.getHomes().then(function(response) {
      console.log(response);
      self.map.markers = response;
    });

    self.lineIcons = [{
      icon: {
          path: self.map.getGmaps().SymbolPath.FORWARD_OPEN_ARROW
      },
      offset: '25px',
      repeat: '50px'
    }];

    self.lineStroke = {
      color: '#6060FB',
      weight: 3
    },

    console.log(map.center);
    uiGmapIsReady.promise(1).then(function(instances) {
      var _map = instances[0].map;
      self.map._map = _map;
      // _map.fitBounds(self.map.getWorldBounds());
      map.getUserGeolocationMarker().then(function(marker) {
        self.userLocation = marker;
        // self.map.markers.push(marker);
        console.log(self.userLocation);
      });
    });
  }

  onSelect(item) {
    var self = this;
    console.log(item);
    self.map.getDetails(item.place_id).then(
      function(place) {
        console.log(place);
      });
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('openworldApp')
  .controller('MapController', MapController);

})();
