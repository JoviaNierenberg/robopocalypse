app.directive('merchantProducts', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/merchant/directives/products/merchant-products.html',
		controller: 'MerchantProductsCtrl',
		scope: {
			merchant: "=",
			categories: "=categories"
		}
	};
});

app.controller('MerchantProductsCtrl', function ($scope, $rootScope, Products) {

	$scope.newProduct = {}

	var getProducts = function () {
		Products.getAll({seller: $scope.merchant._id}).then(function (products) {
			$scope.products = products;
		});
	};

	getProducts();

	$scope.addProduct = function () {
		$scope.newProduct.seller = $scope.merchant._id
		Products.createProduct($scope.newProduct).then(function () {
			getProducts();
		});
	};

	var unbind = $rootScope.$on("productUpdate", getProducts);
	$scope.$on("$destroy", unbind);
});