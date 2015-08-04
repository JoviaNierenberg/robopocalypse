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
			console.log(orders);
			$scope.orders = orders
		});
		// }).then(function(){
		// 	$scope.orders.forEach(function(order){
		// 		for (var item in order.items){
		// 			Products.getOne(order.items[item].product).then(function(product){
		// 				order.items[item].product = product
		// 				order.items[item].total = makeCurrency(order.items[item].quantity * order.items[item].price)
		// 				order.items[item].price = makeCurrency(order.items[item].price)
		// 				order.date = new Date(Date.parse(order.date)).toLocaleString();
		// 			})
		// 		}
		// 	})
		// })
	});
	$scope.updateProfile = function() {
		User.updateUser($scope.user._id, $scope.user);
	};

	

});