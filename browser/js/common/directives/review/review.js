app.directive('review', function () {
    return {
        restrict: 'E',
        scope: {
        	user: '=',
        	id: '='
        },
        templateUrl: 'js/common/directives/review/review.html',
        link: function () {
            //fix later
        	// scope.user = user;
        	// scope.reviews = Reviews.getReviews(user, id);
        }
    };
});