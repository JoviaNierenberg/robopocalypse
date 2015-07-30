app.directive('productReview', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.html',
		scope: {
			theReview: '=review'
		}
	}
})