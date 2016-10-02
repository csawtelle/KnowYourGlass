angular.module('app').controller('adminCtrl', ['$scope', '$rootScope', '$http', 'Base64', '$cookieStore', '$window', '$location',
  function($scope, $rootScope, $http, Base64, $cookieStore, $window, $location) {
        $scope.data = {};
        $scope.data.pageList = {};

        $http({
            method: 'GET',
            url: "/api/pages",
        }).then(function successCallback(response) {
            $scope.data.pageList = response.data.data;
        }, function errorCallback(response) {
            return("Failed to make transaction with database.");
        });
        $scope.data.deletePost = function(name) {
           $http({
                method: 'DELETE',
                url: "/api/pages/" + name
            }).then(function successCallback(response) {
                $window.location.reload();
            }, function errorCallback(response) {
                return("Failed to make transaction with database.");
            });
        };
        $scope.data.editPost = function(name) {
            $window.location.href = '/#/admin/create/' + name;
        };
}])

