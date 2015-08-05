app.directive('merchantProductLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/merchant/directives/products/merchant-product-line.html',
        controller: "MerchantProductLineCtrl",
        scope: {
            theProduct: '=product',
            categories: "=categories"
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

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.theProduct.price = ($scope.theProduct.price/100).toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
});