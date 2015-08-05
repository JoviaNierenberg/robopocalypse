app.directive('storeThumbnail', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/store/store.thumbnail.html',
    scope: {
      theStore: '=store'
    },
    controller: function($scope){
    	$scope.theStore.photo = $scope.theStore.photo || 'http://a.dilcdn.com/bl/wp-content/uploads/sites/8/2014/03/image5.jpg'
    }
  };
});