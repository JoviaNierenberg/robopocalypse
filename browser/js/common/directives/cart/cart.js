app.controller('CartCtrl', function($scope, Cart, $rootScope) {
    // returns all products
    $scope.emptyCart = function() {
        Cart.emptyCart();
    };
    var updateCart = function(cart) {
        $scope.cart = cart;
        $scope.items = [];
        for (var key in $scope.cart.items) {
            var item = {};
            item.product = $scope.cart.items[key].product;
            item.quantity = $scope.cart.items[key].quantity;
            $scope.items.push(item);
        }
    };
    var unbind = $rootScope.$on("cartChange", function(event, cart) {
        updateCart(cart);
    });
    updateCart(Cart.getCart());
    $scope.$on("$destroy", unbind);
});


app.directive('cart', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/cart/cart.html',
        controller: 'CartCtrl'
    };
});
