app.controller('CartCtrl', function ($scope, Cart) {
  // returns all products
  $scope.cart = Cart.getCart()
  $scope.items = []
  for (var key in $scope.cart.items){
  	var item = {}
  	item.product = $scope.cart.items[key].product
  	item.quantity = $scope.cart.items[key].quantity
  	$scope.items.push(item)
  }
});
