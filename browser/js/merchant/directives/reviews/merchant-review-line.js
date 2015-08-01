app.directive("merchantReviewLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/reviews/merchant-review-line.html",
		controller: "MerchantReviewLineCtrl",
		scope: {
			theReview: "=review"
		}
	}
});

app.controller("MerchantReviewLineCtrl", function ($scope, Reviews){
	$scope.delete = function () {
		Reviews.deleteReview($scope.theReview._id);
	}

	$scope.update = function () {
		Reviews.updateReview($scope.theReview._id, $scope.theReview);
	}
});
