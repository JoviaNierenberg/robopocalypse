app.config(function ($stateProvider) {
  $stateProvider.state("merchant", {
    url: "/merchant/{id}",
    templateUrl: "js/merchant/dashboard.html",
    data: {
            isMerchant: true,
            authenticate: true
        },
    controller: "MerchantCtrl"
  })
});


app.controller('MerchantCtrl', function ($scope, Products, Orders, AuthService){
  AuthService.getLoggedInUser().then(function (user) {
    $scope.merchant = user;
  });

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
  $scope.show = function (what) {
    $scope.activeTab = what;
  };
      // $scope.updateOrderStatus = function() {
      //   Orders.updateOrder(order);
      // };
});
