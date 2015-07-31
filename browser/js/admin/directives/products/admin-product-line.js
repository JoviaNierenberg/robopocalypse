app.directive('adminProductLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/products/admin-product-line.html',
        scope: {
            theProduct: '=product'
        },
        controller: function($scope, Products) {
            $scope.deleteProduct = function(id) {
                Products.deleteProduct(id);
            };
            $scope.editProduct = function(id) {
                Products.getOne(id).then(function(response) {
                    // go to state where we edit product?
                    $scope.singleProduct = response;
                });
            };
        }
    };
});