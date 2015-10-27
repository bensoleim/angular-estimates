/**
 * Created by bsoleim on 10/21/15.
 * TrackFront - Angular Version
 * File: estimatesController.js
 * Description: Estimate List Controller
 */


myApp.controller('estimatesController', ['$scope', '$sce','$filter', '$http', '$location', '$log', '$routeParams', 'apiService', function($scope, $sce, $filter, $http, $location, $log, $routeParams, apiService)
{
    $scope.options = {};
    $scope.estimates = {};
    $scope.filters = 'sort=-updated,id&q=[["status","=",1],["status","=",2],["status","=",3],["status","=",4]]&page=1&per_page=50';


    if(apiService.accesstoken == ""){
        $location.path("/login");
    }else{
        apiService.get("estimates/?" + $scope.filters, function(r){

            apiService.estimateOptions = r.options;

            angular.forEach(r.estimates, function(value,key){
                r.estimates[key].created_at = Date.parse(value.created_at.replace(/-/g,"/"));
                r.estimates[key].updated_at = Date.parse(value.updated_at.replace(/-/g,"/"));
            });
            $log.warn(r);
            $scope.estimates = r.estimates;
            $scope.options = r.options;
        });
    }

    $scope.go = function ( path ) {
        $location.path( path );
    };

}]);