/**
 * Created by bsoleim on 10/21/15.
 */

var myApp = angular.module('myApp', ['ngRoute','ngSanitize']);

myApp.controller('mainController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log){
    $log.info($location.path());
}]);