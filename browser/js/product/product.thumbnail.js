app.directive('productThumbnail', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/product/product.thumbnail.html',
		scope: {
			theProduct: '=product'
		},
		controller: function ($scope, Cart) {
			$scope.add = function () {
				Cart.addToCart($scope.theProduct);
			};
		}
	};
});