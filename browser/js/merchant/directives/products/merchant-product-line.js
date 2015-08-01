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

    $scope.theProduct.price = ($scope.theProduct.price/100).toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
});