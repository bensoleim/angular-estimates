

myApp.controller('projectsController', ['$scope', '$sce','$filter', '$http', '$location', '$log', '$routeParams', 'apiService', function($scope, $sce, $filter, $http, $location, $log, $routeParams, apiService)
{
    $scope.options = {};
    $scope.projects = {};

    if(apiService.accesstoken == ""){
        $location.path("/login");
    }else{
        apiService.get("projects/", function(r){
            $log.warn(r);
            $scope.projects = r.projects;
            $scope.options = r.options;
        });
    }

}]);
