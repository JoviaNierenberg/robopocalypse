app.directive("adminUserLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/users/admin-user-line.html",
		controller: "AdminUserLineCtrl",
		scope: {
			theUser: "=user"
		}
	};
});

app.controller("AdminUserLineCtrl", function ($scope, $rootScope, User){
	$scope.userline = $scope.theUser;

	$scope.delete = function () {
		User.deleteUser($scope.theUser._id).then(function () {
			$rootScope.$emit("userUpdate");
		});
	};

	$scope.update = function () {
		User.updateUser($scope.theUser._id, $scope.theUser);
	}
});


