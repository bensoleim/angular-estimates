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
    $scope.options = apiService.estimateOptions;

    $scope.$watch('estimate',function(newValue)
    {
        $log.log($scope.estimate);
    }, true);

    $scope.filterHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    if(apiService.accesstoken == ""){
        $location.path("/login");
    }else{
        apiService.get("estimates/" + $scope.id + "/edit", function(r){
            $scope.options = r.options;
            $log.warn($scope.options);
            $log.warn(r);
            $scope.estimate = r.estimate;
            $scope.bind();
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

    $scope.bind = function()
    {
        setTimeout(function(){
            $("textarea.editor").tinymce({
                script_url: 'media/js/extra/tinymce/tinymce.min.js',
                selector: "textarea.editor",
                toolbar: "bold italic underline bullist numlist outdent indent undo redo removeformat",
                menubar: false,
                theme: "modern",
                skin: 'lightgray',
                plugins: "autoresize",
                relative_urls: false,
                convert_newlines_to_brs: false,
                extended_valid_elements: "a[name|href|target|rel|title|onclick],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style],script[defer|language|src|type],div[class|style],object[classid|codebase|width|height],param[name|value],embed[type|src|width|height],noscript",
                force_p_newlines: false,
                setup: function (ed)
                {
                    ed.on('init', function(e) {

                    });
                    ed.on('change', function (e)
                    {
                        var editor_type = $("#" + ed.id).data("type");
                        switch (editor_type)
                        {
                            case "group":
                                // var group_id = $("#" + ed.id).data("groupId");
                                //self.setGroupDetail(group_id, "description", ed.getContent());
                                break;

                            case "footer":
                                //self.data.estimate.content_footer = ed.getContent();
                                break;
                        }
                    });
                }
            });
        }, 300);

    }


}]);