var slackControllers = angular.module('slackControllers', []);

slackControllers.controller('LoginCtrl', 
    function ($scope)
    {
        
        $scope.isValidName = false;
        $scope.isValidPassword = false;
                            
        $scope.$watch('name', function(newValue, oldValue){
            if(newValue.trim() === "")
            {
                $scope.isValidName = false;
            }
            else
            {
                $scope.isValidName = true;
            }
        });
        
        $scope.$watch('password', function(newValue, oldValue){
            if(newValue.trim() === "")
            {
                $scope.isValidPassword = false;
            }
            else
            {
                $scope.isValidPassword = true;
            }
        });
        
    }
);