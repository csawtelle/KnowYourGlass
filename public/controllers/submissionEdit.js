angular.module('app')
    .controller('submissionEditCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$location', '$routeParams', 'reviewFactory',
        function($scope, $rootScope, $http, Base64, $cookieStore, $location, $routeParams, reviewFactory) {

    var lensReview = $routeParams.lens;
    $scope.data = {};
    $scope.data.formData = {
        pictures: [],
    };
    $scope.data.newData = {
        image: '',
        pictures: [],
        picture_descriptions: [],
        page_paragraphs: []
    };

    getReview();
    function getReview() {
        reviewFactory.getReview(lensReview)
            .then(function (response) {
                console.log(response.data.data[0]);
                $scope.data.newData = response.data.data[0];
            }, function (error) {
                $scope.status = 'Unable to load review data: ' + error.message;
            });
    }
    function updateReview(id, data) {
        reviewFactory.updateReview(id, data)
            .then(function (response) {
                console.log(response);
            }, function (error) {
                $scope.status = 'Unable to update review data: ' + error.message;
            });
    }

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

    $scope.data.formData.starRatings = [
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
    $scope.data.formData.brandList = [
      {name: 'Canon'},
      {name: 'Nikon'},
      {name: 'Sigma'}
    ];
    $scope.data.formData.categoryList = [
      {name: 'Wide Angle'},
      {name: 'Normal'},
    ];
    var blogPost = function() {
        updateReview(lensReview, $scope.data.newData);
    };

    $scope.saveBlogPost = function() {
        var authdata = Base64.decode($cookieStore.get('globals').currentUser.authdata);
        var auth = authdata.split(":");
        $scope.data.newData.username = auth[0];
        $scope.data.newData.password = auth[1];
        blogPost($scope.data.newData);
    };
	$scope.addMoreText = function() {
		$scope.data.newData.page_paragraphs.push("");
	};
	$scope.removeMoreText = function() {
		$scope.data.newData.page_paragraphs.pop();
	};
    $scope.removeDroppedFile = function(index) {
        $scope.data.newData.pictures.splice(index, 1);
    }
    $scope.fileDropped = function(file) {
        if($scope.data.newData.image) {
            $scope.data.newData.pictures.push(file.file.name);
        } else {
            $scope.data.newData.image = file.file.name;
        }
        $scope.interface.uploadFiles();
    };
}])
