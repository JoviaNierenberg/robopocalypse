app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeCtrl"
    });
});

app.controller('HomeCtrl', function($scope, $state, Products, Cart) {
    // returns all products
    Products.getAll().then(function(data) {
        $scope.products = data;
    });

    $scope.cartIsEmpty = function(){
        console.log(Cart.getCart().totalItems)
        return (Cart.getCart().totalItems === 0)
    }
    // adds product to user's cart
    $scope.addToCart = function(product) {
        Cart.addToCart(product);
    };
    // $scope.product = Products.getOne();
    $scope.sortBy = function(chosenMethod) {
        if (chosenMethod === $scope.sortMethod) {
            $scope.sortMethod = "-" + chosenMethod;
        } else {
            $scope.sortMethod = chosenMethod;
        }
        console.log($scope.sortMethod);
    };
});