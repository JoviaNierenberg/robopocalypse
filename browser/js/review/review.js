app.directive('productReview', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.html'
		// controller: function ($scope, Reviews) {
		// },
		// controllerAs: 'ReviewCtrl'
	}
})

app.directive('reviewForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.form.html',
		controller: function($scope, Reviews){
			$scope.review = {};
			$scope.addReview = function(){
				$scope.review = {};
			}
		},
	}
})
