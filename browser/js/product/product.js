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
  	return $scope.singleProduct = product;
    // gets all reviews for the product that has just been found
  }).then(function(product){
      Reviews.getReviews({product: product._id }).then(function(reviews){
      $scope.reviews = reviews;
    });
  }).catch(function(error){
      console.log(error)
    })
  
});
