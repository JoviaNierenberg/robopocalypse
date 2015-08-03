app.config(function($stateProvider) {
    $stateProvider.state("singleProduct", {
        url: "/product/{id}",
        controller: "ProductCtrl",
        templateUrl: "js/product/product.html",
    });
});

app.controller('ProductCtrl', function($scope, Products, Reviews, $stateParams, AuthService) {
    // returns product
    Products.getOne($stateParams.id).then(function(product) {
        $scope.singleProduct = product;
        return product
            // gets all reviews for the product that has just been found
    }).then(function(product) {
        Reviews.getReviews({
            product: product._id
        }).then(function(reviews) {
            $scope.reviews = reviews;
        });
    }).catch(function(error) {
        console.log(error)
    })

    // creates reviews
    $scope.createReview = function(reviewData) {
        reviewData.product = $scope.singleProduct._id
        AuthService.getLoggedInUser().then(function(user) {
            reviewData.user = user._id
            return reviewData
        }).then(function(reviewData) {
            Reviews.createReview(reviewData)
            console.log("reviewData: ", reviewData)
        })
        delete $scope.review
    };
});