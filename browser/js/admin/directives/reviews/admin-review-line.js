app.directive("adminReviewLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/reviews/admin-review-line.html",
		controller: "AdminReviewLineCtrl",
		scope: {
			theReview: "=review"
		}
	}
});

app.controller("AdminReviewLineCtrl", function ($scope, Reviews){
	$scope.delete = function () {
		Reviews.deleteReview($scope.theReview._id);
	}
});
