app.directive('merchantProducts', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/merchant/directives/products/merchant-products.html',
		controller: 'MerchantProductsCtrl'
	};
});

app.controller('MerchantProductsCtrl', function ($scope, $rootScope, Products) {

	var getProducts = function () {
		Products.getAll({seller: $scope.merchant._id}).then(function (products) {
			$scope.products = products;
		});
	};

	getProducts();

	var unbind = $rootScope.$on("productUpdate", getProducts);
	$scope.$on("$destroy", unbind);
});