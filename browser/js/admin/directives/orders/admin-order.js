app.directive("adminOrders", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order.html",
		controller: "AdminOrderCtrl"
	};
});


app.controller("AdminOrderCtrl", function ($scope, Orders) {
	Orders.getOrdersByUser().then(function (orders) {
		$scope.orders = orders;
	})

	$scope.filterStatus = "all";

	$scope.setFilter = function (string) {
		$scope.filterStatus = string;
	}
});


