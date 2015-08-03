app.controller('StoreCtrl', function($scope, Stores) { // removed from function input: Cart, $stateParams, $state
  // returns all products
  Stores.getAll().then(function(data) {
    $scope.stores = data;
  });
});