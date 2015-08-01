app.directive('merchantProductLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/merchant/directives/products/merchant-product-line.html',
        controller: "MerchantProductLineCtrl",
        scope: {
            theProduct: '=product'
        },
    };
});

app.controller("MerchantProductLineCtrl", function($scope, Products) {
    $scope.delete = function() {
        Products.deleteProduct($scope.theProduct._id);
    };
    $scope.update = function() {
        Products.updateProduct($scope.theProduct._id, $scope.theProduct);
    };
});