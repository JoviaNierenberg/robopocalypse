app.directive("userOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/user/directives/orders/user-order-line.html",
		scope: {
			theOrder: "=order"
		},
		controller: "UserOrderLineCtrl"
	};
});

app.controller("UserOrderLineCtrl", function ($scope){
	$scope.theOrder.date = new Date(Date.parse($scope.theOrder.date)).toLocaleString();
});
