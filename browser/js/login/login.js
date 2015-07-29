app.config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
});

app.controller('LoginCtrl', function($scope, $window, AuthService, $state) {
    $scope.login = {};
    $scope.error = null;
    $scope.sendLogin = function(loginInfo) {
        console.log("loginInfo: ", loginInfo)
        $scope.error = null;
        AuthService.login(loginInfo).then(function() {
            $state.go('home');
        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });
    };
    $scope.googleAuth = function() {
        $window.location.href = "/auth/google";
    };
    $scope.facebookAuth = function() {
        $window.location.href = "/auth/facebook";
    };
});