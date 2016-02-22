'use strict';

angular.module('openworldApp', [
  'openworldApp.auth',
  'openworldApp.admin',
  'openworldApp.constants',
  'openworldApp.map',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'uiGmapgoogle-maps',
  'perfect_scrollbar',
  'ngDragDrop'
])
  .config(function($urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCyL1egYNcNQIUcUGbRN-p_vAP3IhpNyjQ',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization,places'
    });
  })
.run(function($rootScope, $state) {
    // Redirect to login if route requires auth and the user is not logged in
    $rootScope.$state = $state;
  });
