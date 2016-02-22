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

    _map: null,

    markers: [],

    getGmaps() {
      return _gmaps;
    },

    getHomes() {
      var deferred = $q.defer();
      var markers = [
        {
          id: 1,
          country: 'Russian Federation',
          city: 'Moscow',
          location: { 'type': 'Point', 'coordinates': [37.35, 55.45] },
          photoUrl: 'http://edugeography.com/images/moscow/moscow-06.jpg',
          latitude: 37.35,
          longitude: 55.45
        },
        {
          id: 2,
          country:'Thailand',
          city: 'Bangkok',
          location: { 'type': 'Point', 'coordinates': [100.47, 13.75] },
          photoUrl: 'http://www.flight-durations.com/template/img/cities/bangkok.jpg',
          latitude: 13.75,
          longitude: 100.47
        },
        {
          id: 3,
          country: 'China',
          city: 'Pekin',
          photoUrl: 'http://www.aviator.net.ua/images/statii/goroda/Pekin3.jpg',
          latitude: 39.93,
          longitude: 116.4
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
        'id': 0,
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
        types: ['geocode', 'establishment']
        // types: ['(cities)']
    };
    service.getPlacePredictions(request,
      function(predictions, status) {
          if (_.isEmpty(predictions)) {
              deferred.resolve([]);
          } else {
              deferred.resolve(predictions.map(function(prediction) {
                  return prediction;
              }));
          }

    });
    return deferred.promise;
  };

  Map.getDetails = function(_placeId) {
    var deferred = $q.defer();
    console.log('Ololo');
    var service = new _gmaps.places.PlacesService(Map._map);
    console.log(_placeId);
    service.getDetails({'placeId': _placeId}, function(place, status) {
      deferred.resolve(place);
    });
    return deferred.promise;
  };


  return Map;
}

angular.module('openworldApp.map')
  .service('Map', MapService);

})();
