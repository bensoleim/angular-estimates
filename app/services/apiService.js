
myApp.service('apiService', ['$http', '$log', function($http, $log){

    var self = this;
    this.priority = 1;
    this.api_location = "https://trackfront-api.appspot.com/v1/";
    this.oauth_location = "https://trackfront-api.appspot.com/oauth/";
    this.accesstoken = "";
    this.client_id = 1;
    this._method = "GET";
    this.responseObj = "";
    this.response = "";
    this.client_secret = "2_P5gVeYb>J@+#hsDv9uq4?Yf_86M4";

    this.login = function(data, callback)
    {
        $(".overlay").show();
        $http({
            method: 'POST',
            url: self.oauth_location + "access_token",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-TrackFront-CustomerID': self.client_id
            },
            data: jQuery.param(data)
        })
            .success(function(result){
                $(".overlay").hide();
                callback(result);
            })
            .error(function(data, status){ console.log(data);});
    };


    this._query = function(path, data, callback)
    {
        $(".overlay").show();

        $http({
            method: self._method,
            url: self.api_location + path,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': self.accesstoken,
                'X-TrackFront-CustomerID': self.client_id
            },
            data: data
        }).then(function successCallback(response)
        {
            $(".overlay").hide();
            if (typeof(callback) == "function")
            {
                var json = response.data;
                self.response = json.response;
                if (json.error == "true") {
                    callback(json);
                }else {
                    callback(json.response.data);
                }
            }
        }, function errorCallback(response) {
            $(".overlay").hide();
            console.log(response);
        });
    };

    this.post = function(path, data, callback)
    {
        self._method = "POST";
        data = JSON.stringify(data);
        self._query(path, data, callback);
    };

    this.get = function(path, callback)
    {
        self._method = "GET";
        self._query(path, "", callback);
    };

    this.put = function(path, data, callback)
    {
        self._method = "PUT";
        data = JSON.stringify(data);
        self._query(path, data, callback);
    };

    this.delete = function(path, callback)
    {
        self._method = "DELETE";
        self._query(path, "", callback);
    };

}]);