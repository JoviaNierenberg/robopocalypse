app.config(function ($stateProvider) {
  $stateProvider.state("requestStore", {
    url: "/requestStore",
    templateUrl: "js/merchant/requestStore.html",
    data: {
            authenticate: true
        },
    controller: "RequestStoreCtrl"
  })
});


app.controller('RequestStoreCtrl', function ($scope, AuthService, User, $state){
  AuthService.getLoggedInUser().then(function (user) {
    $scope.user = user;
  });

  $scope.requestStore = function(){
    User.requestStore($scope.user._id, $scope.user)
    alert('A request has been sent')
    $state.go('home')
  }

});
