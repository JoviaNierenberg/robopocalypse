app.directive("adminOrders", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/orders/admin-order.html",
		controller: "AdminOrderCtrl"
	};
});

function makeCurrency(val){
		return (val/100).toFixed(2).replace(/./g, function(c, i, a) {
			return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
	}

app.controller("AdminOrderCtrl", function ($scope, Orders, Products) {
	Orders.getOrdersByUser().then(function (orders) {
		$scope.orders = orders;
	}).then(function(){
		$scope.orders.forEach(function(order){
			for (var item in order.items){
				Products.getOne(order.items[item].product).then(function(product){
					order.items[item].product = product
					order.items[item].total = makeCurrency(order.items[item].quantity * order.items[item].price)
					order.items[item].price = makeCurrency(order.items[item].price)
					order.subtotal = makeCurrency(order.subtotal)
					order.date = new Date(Date.parse(order.date)).toLocaleString();
				})
			}
		})
	});
});