app.config(function($stateProvider) {
    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "CheckoutCtrl",
        controllerAs: "checkout"
    });
});

app.controller("CheckoutCtrl", function($scope, Cart, AuthService) {

	AuthService.getLoggedInUser().then(function(user){
		$scope.user = user;
	})
    
    function makeAddress(address){
    	return address.firstName + " " + address.lastName + "\n" + address.address + "\n" + address.address2 + "\n" + address.city + ", " + address.state + " " + address.postalCode
    }

    $scope.useBilling = true
    $scope.cart = Cart.getCart();

    $scope.submitOrder = function() {
    	var order = {}
    	order.buyer = $scope.user.email
    	order.billing = makeAddress($scope.billing)
    	if($scope.useBilling){
    		order.shipping = order.billing
    	}
    	else {
    		order.shipping = makeAddress($scope.shipping)
    	}
    	order.items = $scope.cart.items
    	order.subtotal = $scope.cart.subtotal
    	if($scope.seller) order.seller = $scope.seller
        Cart.submitOrder(order);
    };

    this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
        return {
            abbrev: state
        };
    });


});
