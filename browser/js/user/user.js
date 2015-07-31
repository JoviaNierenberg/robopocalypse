app.config(function ($stateProvider) {
	$stateProvider.state("user", {
		url: "/user/{id}",
		templateUrl: "js/user/user.html",
		controller: "UserCtrl"
	});
});

app.controller("UserCtrl", function ($scope, AuthService, Reviews, Orders) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
		Reviews.getReviews({user: user._id}).then(function (reviews) {
			$scope.reviews = reviews;
		});
		Orders.getOrdersByUser(user._id).then(function (orders) {
			$scope.orders = orders;
		});
	});
});