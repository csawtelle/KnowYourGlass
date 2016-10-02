angular.module('app').controller('submissionCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$location', '$routeParams',
 function($scope, $rootScope, $http, Base64, $cookieStore, $location, $routeParams) {
    var lensReview = $routeParams.lens;
    $scope.data = {};
    $scope.data.blogPostData = {};
    $scope.data.page_paragraphs =  [];
    $http({
        method: 'GET',
        url: "/api/pages/" + lensReview,
    }).then(function successCallback(response) {
        $scope.data.blogPostData  = response.data.data[0];
        $scope.data.blogPostData.username = '';
        $scope.data.blogPostData.password = '';
        $scope.data.page_paragraphs = $scope.data.blogPostData.page_paragraphs;
    }, function errorCallback(response) {
        return("Failed to make transaction with database.");
    });

    $scope.interface = {};
    $scope.$on('$dropletReady', function whenDropletReady() {
        $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
        $scope.interface.setRequestUrl('/api/upload');
        $scope.interface.defineHTTPSuccess([/2.{2}/]);
        $scope.interface.useArray(true);
    });
    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
    });
    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {
    });

    $scope.data.starRatings = [
      {id: 'rating0', name: 'Zero Star'},
      {id: 'rating1', name: 'One Star'},
      {id: 'rating2', name: 'Two Stars'},
      {id: 'rating3', name: 'Three Stars'},
      {id: 'rating4', name: 'Four Stars'},
      {id: 'rating5', name: 'Five Stars'},
      {id: 'rating6', name: 'Six Star'},
      {id: 'rating7', name: 'Seven Stars'},
      {id: 'rating8', name: 'Eight Stars'},
      {id: 'rating9', name: 'Nine Stars'},
      {id: 'rating10', name: 'Ten Stars'}
    ];
    $scope.data.brandList = [
      {name: 'Canon'},
      {name: 'Nikon'},
      {name: 'Sigma'}
    ];
    $scope.data.catagoryList = [
      {name: 'Wide Angle'},
      {name: 'Normal'},
    ];

    var blogPost = function() {
        if(lensReview) {
            $http({
                method: 'PUT',
                url: "/api/pages/" + lensReview,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.data.blogPostData
            }).then(function successCallback(response) {
                $location.path('#/admin');
            }, function errorCallback(response) {
                return("Failed to make transaction with database.");
            });
        } else {
            $http({
                method: 'POST',
                url: "/api/pages",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.data.blogPostData
            }).then(function successCallback(response) {
                $location.path('#/admin');
            }, function errorCallback(response) {
                return("Failed to make transaction with database.");
            });
        };
    };

    $scope.saveBlogPost = function() {
        var authdata = Base64.decode($cookieStore.get('globals').currentUser.authdata);
        var auth = authdata.split(":");
        console.log(authdata);
        console.log(auth);
        $scope.data.blogPostData.username = auth[0];
        $scope.data.blogPostData.password = auth[1];
        blogPost($scope.data.blogPostData);
    };
	$scope.addMoreText = function() {
		$scope.data['page_paragraphs'].push("");
	};
	$scope.removeMoreText = function() {
		$scope.data['page_paragraphs'].pop();
	};

}])
