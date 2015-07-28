app.controller('ProductCtrl', function($scope, $state, Products) {
  // returns all products
  Products.getAll().then(function(data) {
    $scope.products = data;
  });
  // adds product to user's cart
  $scope.addToCart = function(product) {
    Cart.addToCart(product);
  };
});