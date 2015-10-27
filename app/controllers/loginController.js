/**
 * Created by bsoleim on 10/21/15.
 * TrackFront - Angular Version
 * File: loginController.js
 * Description: Login Controller
 */


myApp.controller('loginController', ['$scope', '$filter', '$http', '$location', '$log', '$routeParams', 'apiService', function($scope, $filter, $http, $location, $log, $routeParams, apiService)
{
    $scope.username = "bsoleim@purei.com";
    $scope.pw = "purei";
    $scope.access_token = apiService.accesstoken;


    $scope.$watch('access_token',function(newValue)
    {
        apiService.accesstoken = newValue;
    });


    $scope.login = function()
    {
        var params = {};
        params.username = $scope.username;
        params.password = $scope.pw ;
        params.client_id = 1;
        params.client_secret = apiService.client_secret;
        params.grant_type = "password";

        apiService.login(params, function(r){
            $scope.access_token = r.access_token;
            $location.path("/estimates");
        });
    }

}]);