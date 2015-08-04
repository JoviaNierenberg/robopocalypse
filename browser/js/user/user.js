app.config(function ($stateProvider) {
	$stateProvider.state("user", {
		url: "/user/{id}",
		templateUrl: "js/user/user.html",
		controller: "UserCtrl"
	});
});

function makeCurrency(val){
	return "$"+(val/100).toFixed(2).replace(/./g, function(c, i, a) {
		return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	});
}

app.controller("UserCtrl", function ($scope, AuthService, Reviews, Orders, User) {
	AuthService.getLoggedInUser().then(function (user) {
		$scope.user = user;
		Reviews.getReviews({user: user._id}).then(function (reviews) {
			$scope.reviews = reviews;
		});
		Orders.getOrdersByUser(user.email).then(function (orders) {
			$scope.orders = orders
		});
	});
	$scope.updateProfile = function() {
		User.updateUser($scope.user._id, $scope.user);
	};

	

});