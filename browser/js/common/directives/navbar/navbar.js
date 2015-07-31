app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {
            scope.user = null;
            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };
            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };
<<<<<<< HEAD
            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
=======
            scope.viewUserPage = function () {
                $state.go("user", {id: scope.user._id});
            }
            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    if(user){
                        scope.user = user;
                    }
>>>>>>> 7ccc0a1806b4ce97c6c1c0e5ccc6e551a7d6b041
                });
            };
            var removeUser = function() {
                scope.user = null;
            };
            setUser();
            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
        }
    };
});
