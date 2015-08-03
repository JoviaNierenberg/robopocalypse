app.directive("cartItem", function () {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/cart/cart-item.html',
		scope: {
			theItem: "=product"
		},
		controller: function ($scope, Cart){
			$scope.selectedQuantity = $scope.theItem.quantity;
			$scope.updateItem = function (quantity) {
				$scope.selectedQuantity = quantity;
				Cart.setQuantity($scope.theItem, quantity);
			};
			$scope.removeItem = function () {
				Cart.removeFromCart($scope.theItem);
			};
		}
	}
})



