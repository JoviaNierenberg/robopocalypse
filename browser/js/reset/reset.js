app.config(function($stateProvider) {
	$stateProvider.state("reset", {
		url: "/passReset?email&expirationTime&token",
		templateUrl: "js/reset/reset.html",
		controller: function ($scope, $stateParams, $http, $state) {
			$scope.newPassword = "";
			$scope.resetPass = function () {
				$stateParams.newPassword = $scope.newPassword;
				$http.get("/api/reset/key", {params: $stateParams}).then(function () {
					$state.go("login");
				});
			}
		}
	});
});