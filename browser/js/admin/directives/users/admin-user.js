app.directive("adminUsers", function () {
	return {
		restrict: "E",
		templateUrl: "js/admin/directives/users/admin-user.html",
		controller: "AdminUserCtrl"
	};
});

app.controller("AdminUserCtrl", function ($scope, User) {
	User.getAll().then(function (users) {
		$scope.users = users;
	});
});