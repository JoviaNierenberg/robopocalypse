app.config(function ($stateProvider) {
	$stateProvider.state("singleProduct", {
		url: "/product/{id}",
		controller: "ProductCtrl",
		templateUrl: "js/product/product.html",
	});
});


app.controller('ProductCtrl', function ($scope, Products, Reviews, $stateParams) {
  // returns all products
  Products.getOne($stateParams.id).then(function (product) {
  	$scope.singleProduct = product;
  });
  Reviews.getReviews().then(function(reviews){
  	$scope.reviews = reviews;
  });
});
