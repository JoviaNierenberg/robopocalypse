app.directive("userOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/user/directives/orders/user-order-line.html",
		scope: {
			theOrder: "=order"
		}
	};
});

// app.controller("AdminOrderLineCtrl", function ($scope, Orders){
// });
