// review form
app.config(function($stateProvider) {
    $stateProvider.state('reviewForm', {
        url: '/reviewForm',
        templateUrl: 'js/review/review.form.html'
        // controller: 'ReviewFormCtrl'
    });
});

app.directive('reviewForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.form.html'
	}
})

// review display
app.directive('productReview', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.html'
	}
})





