app.directive('review', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.html',
		scope: {
			theReview: '=review'
		}
	}
})