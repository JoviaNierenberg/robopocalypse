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

app.controller("MerchantReviewLineCtrl", function ($scope){
	$scope.theReview.user.full_name = $scope.theReview.user.name.first + " " + $scope.theReview.user.name.last
});
