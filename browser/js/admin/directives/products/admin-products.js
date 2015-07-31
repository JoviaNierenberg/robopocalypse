app.directive('adminProducts', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/admin/directives/products/admin-products.html',
    controller: 'AdminProductsCtrl'
  };
});

app.controller('AdminProductsCtrl', function($scope, Products) {
  Products.getAll().then(function(products) {
    console.log(products);
    $scope.products = products;
  });
});