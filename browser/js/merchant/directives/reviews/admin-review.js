app.directive("adminReviews", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/reviews/admin-review.html",
		controller: "AdminReviewCtrl"
	}
});



app.controller("AdminReviewCtrl", function ($scope, $rootScope, Reviews) {
	var getReviews = function () {
		Reviews.getReviews().then(function (reviews) {
			$scope.reviews = reviews;
		});
	};

	getReviews();

	var unbind = $rootScope.$on("reviewUpdate", getReviews);
	$scope.$on("$destroy", unbind);
});