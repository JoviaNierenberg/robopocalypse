app.config(function ($stateProvider) {
	$stateProvider.state("singleStore", {
		url: "/store/{url}",
    scope:{
      store: '='
    },
		controller: "SingleStoreCtrl",
		templateUrl: "js/store/singleStore.html",
	});
});

app.controller('SingleStoreCtrl', function ($scope, Stores, $stateParams, Cart) {
  // returns product
  Stores.getStore($stateParams.url).then(function (products) {
  	$scope.products = products;
    // gets all reviews for the product that has just been found
  })

  $scope.addToCart = function(product) {
    Cart.addToCart(product);
  };
  
});
