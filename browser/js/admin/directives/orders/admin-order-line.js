app.directive("adminOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order-line.html",
		scope: {
			theOrder: "=order"
		}
	};
});

// app.controller("AdminOrderLineCtrl", function ($scope, Orders){
// });
