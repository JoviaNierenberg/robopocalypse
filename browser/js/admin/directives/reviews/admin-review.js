app.directive("adminReviews", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/reviews/admin-review.html",
		controller: "AdminReviewCtrl"
	}
});



app.controller("AdminReviewCtrl", function ($scope, Reviews) {
	Reviews.getReviews().then(function (reviews) {
		$scope.reviews = reviews;
	});
});