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


app.controller('MerchantCtrl', function ($scope, Orders, AuthService, Categories){
  AuthService.getLoggedInUser().then(function (user) {
    $scope.merchant = user;
  });

  var getCategories = function () {
    Categories.getAll().then(function(categories) {
      $scope.theCategories = categories;
    });
  }

  getCategories();

  $scope.show = function (what) {
    $scope.activeTab = what;
  };
      // $scope.updateOrderStatus = function() {
      //   Orders.updateOrder(order);
      // };
});
