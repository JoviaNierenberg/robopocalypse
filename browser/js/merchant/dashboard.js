app.config(function ($stateProvider) {
  $stateProvider.state("admin", {
    url: "/admin",
    templateUrl: "js/admin/dashboard.html",
    data: {
            isMerchant: true,
            authenticate: true
        },
    controller: "AdminCtrl"
  })
});


app.controller('AdminCtrl', function ($scope, Products, Categories, User, Orders){
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

  $scope.show = function (what) {
    $scope.activeTab = what;
  };
      // $scope.updateOrderStatus = function() {
      //   Orders.updateOrder(order);
      // };
});
