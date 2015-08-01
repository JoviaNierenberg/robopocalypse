app.directive("adminCategories", function () {
  return {
    restrict: "E",
    templateUrl: "js/admin/directives/categories/admin-category.html",
    controller: "AdminCategoriesCtrl",
    scope: {
    	categories: "=categories"
    }
  };
});

app.controller("AdminCategoriesCtrl", function ($scope, $rootScope) {
	
	$scope.add = function () {
		$rootScope.$emit("categoryUpdate");
	}
});