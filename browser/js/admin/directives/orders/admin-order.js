app.directive("adminOrders", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order.html",
		controller: "AdminOrderCtrl"
	};
});


app.controller("AdminOrderCtrl", function ($scope, Orders, Products) {
	Orders.getOrdersByUser().then(function (orders) {
		$scope.orders = orders;
	}).then(function(){
		$scope.orders.forEach(function(order){
			for (var item in order.items){
				Products.getOne(order.items[item].product).then(function(product){
					order.items[item].product = product
					order.items[item].price = (order.items[item].price/100).toFixed(2)
					order.subtotal = (order.subtotal/100).toFixed(2)
					order.items[item].total = order.items[item].quantity * order.items[item].price
					order.date = new Date(Date.parse(order.date)).toLocaleString();
				})
			}
		})
	});
});