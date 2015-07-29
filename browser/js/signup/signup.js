app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'signupController'
    });
});

app.controller('signupController', function($scope, $window, AuthService, $state) {
    console.log('in signupController')
    $scope.createUser = function(userData) {
        console.log("create user entered. User data:", userData);
        AuthService.signup(userData)
        .then(function(signedupUser){
            console.log('in .then')
            $state.go('home')
        })
        // Signup.createUser($scope.SignupForm).then(function(response) {
        //     console.log("User creation response ", response);
        //     delete $scope.SignupForm;
        //     $state.go('home');
        // });
    };
    $scope.googleAuth = function() {
        console.log("Authenticating with Google OAuth2");
        $window.location.href = "/authentication/google";
    };
    $scope.facebookAuth = function() {
        console.log("Authenticating with Facebook");
        $window.location.href = "/authentication/facebook";
    };
});