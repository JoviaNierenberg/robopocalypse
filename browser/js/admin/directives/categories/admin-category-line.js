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
        Categories.deleteCategory($scope.theCategory._id);
        alert($scope.theCategory.name + ' has been deleted')
    };
    $scope.editCategory = function() {
        Categories.updateOne($scope.theCategory._id, $scope.theCategory.name)
        alert($scope.theCategory.name + ' has been updated')
    };
    // $scope.createCategory = function(cat) {
    // }
});