app.directive("merchantOrderLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/orders/merchant-order-line.html",
		scope: {
			theOrder: "=order"
		},
		controller: "MerchantOrderLineCtrl"
	}
});

app.controller("MerchantOrderLineCtrl", function ($scope, Orders){
	$scope.allStatus = ['Created', 'Processing', 'Cancelled', 'Complete']

	$scope.update = function(){
		Orders.updateOrder($scope.theOrder)
	}
});