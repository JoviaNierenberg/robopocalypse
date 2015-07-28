app.directive('review', function (Reviews) {
    return {
        restrict: 'E',
        scope: {
        	user: '=',
        	id: '='
        },
        templateUrl: 'js/common/directives/review/review.html',
        link: function(scope){
        	scope.user = user;
        	scope.reviews = Reviews.getReviews(user, id);
        }
    };
});