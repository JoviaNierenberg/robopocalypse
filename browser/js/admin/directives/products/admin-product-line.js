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
        Products.updateProduct($scope.theProduct);
    };
    $scope.removeImg = function(index){
        $scope.theProduct.photos.splice(index, 1);
        // Products.updateProduct($scope.theProduct);
    }

    $scope.theProduct.price = ($scope.theProduct.price/100).toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
});