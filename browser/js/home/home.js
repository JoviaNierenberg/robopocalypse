app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: "HomeCtrl"
    });
});

app.controller('HomeCtrl', function($scope, $state, Products, Cart) {
    // returns all products
    var assignData = function (data) {
        $scope.products = data;
        if(data.length === 0){
            $scope.noContent = true;
        }
    };

    if($scope.search) {
        Products.search($scope.search).then(assignData);
    }else {
        Products.getAll().then(assignData);
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
    };
});

app.directive("homePage", function () {
    return {
        templateUrl: "js/home/home.html",
        controller: "HomeCtrl",
        scope: {
            search: "=search"
        }
    }
})



