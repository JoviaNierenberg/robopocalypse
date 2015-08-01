app.directive('adminCategoryLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/categories/admin-category-line.html',
        controller: "AdminCategoryLineCtrl",
        scope: {
            theCategory: '=category'
        },
    };
});

app.controller("AdminCategoryLineCtrl", function($scope, $rootScope, Categories) {

    $scope.deleteCategory = function() {
        Categories.deleteCategory($scope.theCategory.name);
        $rootScope.$emit("categoryUpdate");
    };
    $scope.editCategory = function(catName) {
        Categories.getOne($scope.theCategory.name).then(function(response) {
            // go to state where we edit category?
            $rootScope.$emit("categoryUpdate");
            // $scope.singleCategory = response; < not that
        });
    };
});