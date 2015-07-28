app.config(function ($stateProvider) {
	$stateProvider.state("product", {
		url: "/product/{id}",
		templateUrl: "js/product/product.html",
		controller: "ProductCtrl"
	});
});


app.controller('ProductCtrl', function ($scope, Products, $stateParams) {
  // returns all products
  Products.getOne($stateParams.id).then(function (product) {
  	$scope.product = product;
  });
});
