'use strict';

angular.module('openworldApp.auth', [
  'openworldApp.constants',
  'openworldApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
