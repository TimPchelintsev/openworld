'use strict';

(function() {


function MapService($q, uiGmapGoogleMapApi) {

  var _gmaps = null;

  var Map = {

    center: { latitude: 20, longitude: 0 },

    zoom: 2,

    control: {},

    options: {
      scrollwheel: true
    },

    markers: [],

    getGmaps() {
      return _gmaps;
    },

    getHomes() {
      console.log('hi')
      var deferred = $q.defer();
      var markers = [
        {
          id: 1,
          country: 'Russian Federation',
          city: 'Moscow',
          location: { 'type': 'Point', 'coordinates': [55.45, 37.35] }
        }
      ];
      deferred.resolve(markers);
      return deferred.promise;
    }
  };

  Map.init = function() {
    var deferred = $q.defer();
    uiGmapGoogleMapApi.then(function(maps) {
      _gmaps = maps;
      deferred.resolve(Map);
    });
    return deferred.promise;
  };



  return Map;
}

angular.module('openworldApp.map')
  .service('Map', MapService);

})();
