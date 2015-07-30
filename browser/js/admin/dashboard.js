app.directive('adminDashboard', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/admin/dashboard.html',
    scope: {
      theProduct: '=product'
    },
    controller: function ($scope, Products, Categories, Users, Orders, $stateParams) {
      $scope.deleteProduct = function (product) {
        Products.deleteProduct(product._id);
      };
      $scope.getProducts = function() {
        Products.getAll();
      };
      $scope.updateProduct = function(product) {
        Products.updateProduct(product);
      };
      $scope.createProduct = function(product) {
        Products.createProduct(product);
      };
      $scope.createCategory = function(category) {
        Categories.createCategory(category);
      };
      $scope.deleteUser = function(user) {
        User.deleteUser(user._id);
      };
      // $scope.updateOrderStatus = function() {
      //   Orders.updateOrder(order);
      // };
    }
  };
});