/**
 * Created by bsoleim on 10/21/15.
 * TrackFront - Angular Version
 * File: routes.js
 * Description: Routing File
 */


myApp.config(function ($routeProvider)
{
    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/main.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'loginController'
        })
        .when('/estimates', {
            templateUrl: 'app/templates/estimates.html',
            controller: 'estimatesController'
        })
        .when('/estimate/:id', {
            templateUrl: 'app/templates/estimate.html',
            controller: 'estimateController'
        })
        .when('/projects', {
            templateUrl: 'app/templates/projects.html',
            controller: 'projectsController'
        })
        .when('/project/:id', {
            templateUrl: 'app/templates/project.html',
            controller: 'projectController'
        });
});