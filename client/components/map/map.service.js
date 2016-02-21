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
      var deferred = $q.defer();
      var markers = [
        {
          id: 2,
          country: 'Russian Federation',
          city: 'Moscow',
          location: { 'type': 'Point', 'coordinates': [37.35, 55.45] }
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

  Map.getCurrentGeolocation = function() {
    var deferred = $q.defer();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {deferred.resolve(position);},
          function(error) {deferred.reject(error);}
        );
    } else {
        deferred.reject('Geolocation is not supported by this browser.');
    }
    return deferred.promise;
  };

  Map.getUserGeolocationMarker = function() {
    return Map.getCurrentGeolocation().then(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      return {
        'location': {'type': 'Point', 'coordinates': [lon, lat]},
        'id': 1,
        'icon': 'http://maps.google.com/mapfiles/ms/micons/man.png'
      };
    });
  };

  Map.autocomplete = function(val) {
    var deferred = $q.defer();
    var service = new _gmaps.places.AutocompleteService();

    var request = {
        input: val,
        // componentRestrictions: {country: 'ua'},
        // types: ['geocode', 'establishment']
        types: ['(cities)']
    };
    service.getPlacePredictions(request,
      function(predictions, status) {
          if (_.isEmpty(predictions)) {
              deferred.resolve([]);
          } else {
              deferred.resolve(predictions.map(function(prediction) {
                  console.log(prediction);
                  return prediction;
              }));
          }

    });
    return deferred.promise;
  };


  return Map;
}

angular.module('openworldApp.map')
  .service('Map', MapService);

})();
