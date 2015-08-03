app.directive("merchantOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/orders/merchant-order-line.html",
		controller: "MerchantOrderLineCtrl",
		scope: {
			theOrder: "=order"
		}
	}
});

// app.controller("MerchantOrderLineCtrl", function ($scope, Orders){
	
// });
