app.directive('adminProductLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/products/admin-product-line.html',
        controller: "AdminProductLineCtrl",
        scope: {
            theProduct: '=product'
        },
    };
});

app.controller("AdminProductLineCtrl", function($scope, Products) {
    $scope.delete = function() {
        Products.deleteProduct($scope.theProduct._id);
    };
    $scope.update = function() {
        Products.updateProduct($scope.theProduct._id, $scope.theProduct);
    };
});