var slackApp = angular.module('slackApp', ['ngRoute', 'slackControllers']);

slackApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'login.html',
        controller: 'LoginCtrl'
        }).
        otherwise({
        redirectTo: '/'
        });
});

slackApp.factory('displayList', function($http){

    var cachedData;

});
