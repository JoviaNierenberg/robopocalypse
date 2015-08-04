app.config(function($stateProvider) {
    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "CheckoutCtrl",
        controllerAs: "checkout"
    });
});

app.controller("CheckoutCtrl", function($scope, Cart, AuthService, Util) {

	AuthService.getLoggedInUser().then(function(user){
		$scope.user = user;
	})
    
    function makeAddress(address){
    	return address.firstName + " " + address.lastName + "\n" + address.address + "\n" + address.address2 + "\n" + address.city + ", " + address.state + " " + address.postalCode
    }

    $scope.useBilling = true
    $scope.cart = Cart.getCart();
    this.states = Util.stateAbbrevs();

    $scope.submitOrder = function() {
    	if($scope.cart.totalItems === 0) return alert('no items selected')
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
    	Cart.emptyCart();
    };

});
