app.config(function ($stateProvider) {
	$stateProvider.state("product", {
		url: "/product/{id}",
		resolve: {
			product: function (Products, $stateParams) {
				return Products.getOne($stateParams.id);
			}
		}
	});
});


app.controller('ProductCtrl', function($scope, $state, Products) {
  // returns all products
  console.log($scope);
});
