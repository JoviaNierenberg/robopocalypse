app.directive('adminProducts', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/admin/directives/products/admin-products.html',
		controller: 'AdminProductsCtrl'
	};
});

app.controller('AdminProductsCtrl', function ($scope, $rootScope, Products) {

	var getProducts = function () {
		Products.getAll().then(function (products) {
			$scope.products = products;
		});
	};

	getProducts();

	var unbind = $rootScope.$on("productUpdate", getProducts);
	$scope.$on("$destroy", unbind);
});