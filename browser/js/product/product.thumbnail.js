app.directive('productThumbnail', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/product/product.thumbnail.html',
		scope: {
			theProduct: '=product'
		},
		controller: function ($scope, Cart) {
			console.log($scope.theProduct);
			$scope.add = function () {
				Cart.addToCart($scope.theProduct);
			};
		}
	};
});