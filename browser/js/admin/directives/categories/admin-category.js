app.directive("adminCategories", function () {
  return {
    restrict: "E",
    templateUrl: "js/admin/directives/categories/admin-category.html",
    controller: "AdminCategoriesCtrl"
  };
});

app.controller("AdminCategoriesCtrl", function ($scope, Categories) {
  Categories.getAll().then(function(categories) {
    console.log(categories);
    $scope.categories = categories;
  });
});