app.config(function($stateProvider) {
    $stateProvider.state("checkout", {
        url: "/checkout",
        templateUrl: "js/checkout/checkout.html",
        controller: "CheckoutCtrl",
        controllerAs: "checkout"
    });
});

app.controller("CheckoutCtrl", function($scope, Cart) {
    $scope.cart = Cart.getCart();
    $scope.submitOrder = function() {
        Cart.submitOrder();
    };
    $scope.checkout = true;
    this.userState = '';
    this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
        return {
            abbrev: state
        };
    });
});
