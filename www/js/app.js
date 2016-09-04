// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'controllers', 'ionic-numberpicker', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .state('equipos_num', {
      url: '/equipos_num',
      templateUrl: 'templates/equipos_num.html',
      controller: 'EquiposNumCtrl'
    })
		.state('equipos_nombre', {
      url: '/equipos_nombre',
      templateUrl: 'templates/equipos_nombre.html',
      controller: 'EquiposNombreCtrl'
    })
		.state('turno_empezar', {
      url: '/turno_empezar',
      templateUrl: 'templates/turno_empezar.html',
      controller: 'TurnoEmpezarCtrl'
    })
		.state('turno', {
      url: '/turno',
      templateUrl: 'templates/turno.html',
      controller: 'TurnoCtrl'
    })
		.state('acertadas', {
      url: '/acertadas',
      templateUrl: 'templates/acertadas.html',
      controller: 'AcertadasCtrl'
    })
		.state('fin_ronda', {
      url: '/fin_ronda',
      templateUrl: 'templates/fin_ronda.html',
      controller: 'FinRondaCtrl'
    })
		.state('empate', {
      url: '/empate',
      templateUrl: 'templates/empate.html',
      controller: 'EmpateCtrl'
    })
		.state('ganador', {
      url: '/ganador',
      templateUrl: 'templates/ganador.html',
      controller: 'GanadorCtrl'
    })
		.state('ajustes', {
      url: '/ajustes',
      templateUrl: 'templates/ajustes.html',
      controller: 'AjustesCtrl'
    })
		.state('mazos', {
      url: '/mazos',
      templateUrl: 'templates/mazos.html',
      controller: 'MazosCtrl'
    });

	// if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
