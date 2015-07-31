app.directive("adminUserLine", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/users/admin-user-line.html",
		controller: "AdminUserLineCtrl",
		scope: {
			theUser: "=user"
		}
	}
});

app.controller("AdminUserLineCtrl", function ($scope, User){
	$scope.delete = function () {
		User.deleteUser($scope.theUser._id);
	}
});


