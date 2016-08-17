var slackControllers = angular.module('slackControllers', []);

slackControllers.controller('LoginCtrl', function ($scope,$http) {

    $scope.validateLogin = function() {

        var x = document.getElementById("loginStatusDiv");

        $http.get('/slack/logon/:'+$scope.inputName+'/:'+$scope.inputPassword)
        .success(function(data) {
            
            console.log(data[0]);
        });    
    };
});

