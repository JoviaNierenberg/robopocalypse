// review form
app.config(function($stateProvider) {
    $stateProvider.state('reviewForm', {
        url: '/reviewForm',
        templateUrl: 'js/review/review.form.html'
    });
});

app.directive('reviewForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/review/review.form.html'
    };
});

// review display
app.directive('productReview', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/review/review.html'
    };
});

app.controller('StarCtrl', ['$scope', function($scope) {
    $scope.ratings = [{
        current: 3,
        max: 5
    }];
}]);

app.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function(scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    };
});