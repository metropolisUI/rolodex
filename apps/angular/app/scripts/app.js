'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/topic', {
        templateUrl: 'views/topic.html',
        controller: 'AboutCtrl'
      })
	    .when('/register', {
		    templateUrl: 'views/signup.html'
	    })
	    .when('/login', {
			    templateUrl: 'views/login.html'
	    })
	    .when('/profile',{
		    templateUrl: 'views/profile.html'
	    })
      .otherwise({
        redirectTo: '/'
      });
  });
