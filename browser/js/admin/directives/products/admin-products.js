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

app.controller('AdminProductsCtrl', function ($scope, $rootScope, Products, Stores) {

	$scope.newProduct = {}
	$scope.newProduct.category = [];
	$scope.toggle = function (item, list) {
	  var idx = list.indexOf(item);
	  if (idx > -1) list.splice(idx, 1);
	  else list.push(item);
	};
	$scope.exists = function (item, list) {
	  return list.indexOf(item) > -1;
	};

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

	$scope.loadStores = function(){
		Stores.getAll().then(function(stores){
			$scope.stores = stores
		})
	}


	var unbind = $rootScope.$on("productUpdate", getProducts);
	$scope.$on("$destroy", unbind);
});