app.directive("merchantOrders", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/orders/merchant-order.html",
		controller: "MerchantOrderCtrl"
	}
});



app.controller("MerchantOrderCtrl", function ($scope, Orders) {
	Orders.getOrdersByMerchant($scope.merchant._id).then(function (orders) {
		$scope.orders = orders;
	});
});