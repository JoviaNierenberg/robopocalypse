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

app.controller("AdminCategoriesCtrl", function ($scope, Categories) {
	$scope.addCategory = function () {
		Categories.createCategory($scope.theCategory.name)
    alert($scope.theCategory.name + ' has been added as a category')
    $scope.categories.push({name: $scope.theCategory.name})
	};
});