angular.module('app').controller('toolbarCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

}]);
angular.module('app').controller('latestPostsCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

}]);

angular.module('app').controller('TabController', function(){
    this.tab = 0;
    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
});
angular.module('app').controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.addSlide = function() {
    var newWidth = 2 + slides.length + 1;
    slides.push({
      image: '/images/is' + newWidth + '.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };
  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }


  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
});
