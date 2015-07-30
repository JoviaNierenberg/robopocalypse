app.directive('productReview', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/review/review.html',
		controller: function ($scope, Reviews) {
			// returns all reviews
			Reviews.getReviews().then(function(reviews){
				$scope.allReviews = reviews
			})
			
			// Reviews.getOne($stateParams.id).then(function(review){
			// 	$scope.singleReview = review;
			// 	console.log("review in getOne: ", review)
			// })
			// console.log("single review: ", $scope.singleReview)
		},
		controllerAs: 'ReviewCtrl'
	}
})

// app.config(function ($stateProvider) {
// 	$stateProvider.state("singleReview", {
// 		url: "/review/{id}",
// 		controller: "ReviewCtrl",
// 		templateUrl: "js/review/review.html",
// 	});
// });


// app.controller('ReviewCtrl', function ($scope, Reviews, $stateParams) {
//   // returns all reviews
//   Reviews.getOne($stateParams.id).then(function (review) {
//   	$scope.singleReview = review;
//   });
// });