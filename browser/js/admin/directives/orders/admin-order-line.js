app.directive("adminOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order-line.html",
		scope: {
			theOrder: "=order"
		},
		controller: 'AdminOrderLineCtrl'
	};
});

app.controller("AdminOrderLineCtrl", function ($scope, Orders){
	$scope.allStatus = ['Created', 'Processing', 'Cancelled', 'Complete']

	$scope.update = function(){
		Orders.updateOrder($scope.theOrder)
	}
});
