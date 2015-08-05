app.directive('storeThumbnail', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/store/store.thumbnail.html',
    scope: {
      theStore: '=store'
    }
  };
});