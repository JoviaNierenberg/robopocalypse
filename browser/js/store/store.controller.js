app.controller('StoreCtrl', function($scope, $state, Stores, Cart, $stateParams) {
  // returns all products
  Stores.getAll().then(function(data) {
    $scope.stores = data;
  });
});