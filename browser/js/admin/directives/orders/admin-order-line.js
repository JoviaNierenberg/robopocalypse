app.directive("adminOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order-line.html",
		controller: "AdminOrderLineCtrl",
		scope: {
			theOrder: "=order"
		}
	};
});

app.controller("AdminOrderLineCtrl", function ($scope, Orders){
});
