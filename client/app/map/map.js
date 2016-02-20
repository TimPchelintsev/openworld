'use strict';

angular.module('openworldApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('map', {
        url: '/map',
        templateUrl: 'app/map/map.html',
        controller: 'MapController',
        controllerAs: 'map',
        resolve: {
            map: function(Map) {
                return Map.init();
            }
        }
      });
  });
