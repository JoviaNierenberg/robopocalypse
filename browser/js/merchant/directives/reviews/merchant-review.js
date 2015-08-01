app.directive("merchantReviews", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/reviews/merchant-review.html",
		controller: "MerchantReviewCtrl"
	}
});



app.controller("MerchantReviewCtrl", function ($scope, $rootScope, Reviews, Products) {
	

	var getReviews = function () {
		Products.getAll({seller: $scope.merchant._id}).then(function(products){
			$scope.reviews = [];
			products.forEach(function(product){
				Reviews.getReviews({product: product._id}).then(function (reviews) {
					$scope.reviews = $scope.reviews.concat(reviews)
				});
			})
		});
	};

	getReviews();

	var unbind = $rootScope.$on("reviewUpdate", getReviews);
	$scope.$on("$destroy", unbind);
});