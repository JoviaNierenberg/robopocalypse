app.directive('adminProducts', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/directives/products/admin-products.html',
		controller: 'AdminProductsCtrl',
		scope: {
			categories: "=categories"
		}
	};
});

app.controller('AdminProductsCtrl', function ($scope, $rootScope, Products) {

	$scope.newProduct = {};

	var getProducts = function () {
		Products.getAll().then(function (products) {
			$scope.products = products;
		});
	};

	getProducts();

	$scope.addProduct = function () {
		Products.createProduct($scope.newProduct).then(function () {
			getProducts();
		});
	};

	var unbind = $rootScope.$on("productUpdate", getProducts);
	$scope.$on("$destroy", unbind);
});