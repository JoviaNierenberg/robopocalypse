app.directive("merchantOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/orders/merchant-order-line.html",
		scope: {
			theOrder: "=order"
		}
	}
});

// app.controller("MerchantOrderLineCtrl", function ($scope, Orders){
	
// });
