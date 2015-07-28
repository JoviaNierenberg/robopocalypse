app.controller('HomeCtrl', function($scope, $state, Products, Cart) {
  // returns all products

  console.log("hi")

  Products.getAll().then(function(data) {
    $scope.products = data;
    console.log(data, 1);
  });
  // adds product to user's cart
  $scope.addToCart = function(product) {
    Cart.addToCart(product);
  };
});