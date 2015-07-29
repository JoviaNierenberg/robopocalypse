app.controller('HomeCtrl', function($scope, $state, Products, Cart) {
  // returns all products
  Products.getAll().then(function(data) {
    $scope.products = data;
  });
  // adds product to user's cart
  $scope.addToCart = function(product) {
    Cart.addToCart(product);
  };
});