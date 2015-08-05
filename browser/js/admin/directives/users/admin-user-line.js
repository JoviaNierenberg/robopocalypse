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

app.controller("AdminUserLineCtrl", function ($scope, User, Emails){

	$scope.delete = function () {
		User.deleteUser($scope.theUser._id);
	};

	$scope.update = function () {
		User.updateUser($scope.theUser._id, $scope.theUser);
	}

	$scope.makeMerchant = function(){
		$scope.theUser.roles[0] = 'Merchant'
		User.updateUser($scope.theUser._id, $scope.theUser)
		Emails.sendMerchantAccepted($scope.theUser)
		alert($scope.theUser.name.first + "" + $scope.theUser.name.last + " is now a Merchant")
	}
});


