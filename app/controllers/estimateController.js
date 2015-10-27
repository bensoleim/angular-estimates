/**
 * Created by bsoleim on 10/21/15.
 * TrackFront - Angular Version
 * File: estimateController.js
 * Description: Estimate Edit Controller
 */

myApp.controller('estimateController', ['$scope', '$sce','$filter', '$http', '$location', '$log', '$routeParams', 'apiService', function($scope, $sce, $filter, $http, $location, $log, $routeParams, apiService)
{
    $scope.id = $routeParams.id || 5157;
    $scope.estimate = {};

    $scope.$watch('estimate',function(newValue)
    {
        $log.log($scope.estimate.groups);
    }, true);

    $scope.filterHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    if(apiService.accesstoken == ""){
        $location.path("/login");
    }else{
        apiService.get("estimates/" + $scope.id, function(r){
            $log.warn(r);
            $scope.estimate = r;
        });
    }

    $scope.saveEst = function()
    {
        $scope.estimate.isnew = false;
        console.log(angular.toJson($scope.estimate, true));

        // Save Estimate API
        apiService.put("estimates/" + $scope.id, $scope.estimate, function(e){
            console.log(e);
        });
    };


}]);