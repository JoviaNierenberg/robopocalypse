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
    $scope.deleteProduct = function() {
        Products.deleteProduct($scope.theProduct._id);
    };
    $scope.editProduct = function(id) {
        Products.getOne($scope.theProduct._id).then(function(response) {
            // go to state where we edit product?
            $scope.singleProduct = response;
        });
    };
});