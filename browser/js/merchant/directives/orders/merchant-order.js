app.directive("merchantOrders", function () {
	return {
		restrict: "E",
		templateUrl: "js/merchant/directives/orders/merchant-order.html",
		controller: "MerchantOrderCtrl"
	}
});



app.controller("MerchantOrderCtrl", function ($scope, Orders, Products) {
	Orders.getOrdersByMerchant($scope.merchant._id).then(function (orders) {
		$scope.orders = orders;
	}).then(function(){
		$scope.orders.forEach(function(order){
			for (var item in order.items){
				Products.getOne(order.items[item].product).then(function(product){
					order.items[item].product = product
					order.items[item].price = (order.items[item].price/100).toFixed(2)
					order.subtotal = (order.subtotal/10000).toFixed(2)
					order.items[item].total = order.items[item].quantity * order.items[item].price
					order.date = new Date(Date.parse(order.date)).toLocaleString();
				})
			}
		})
	});
});