app.factory('Reviews', function($http) {
    return {
        // returns all reviews
        getReviews: function(user, id) {
            var queryParams = {};
            if (user) queryParams.user = id;
            else queryParams.product = id;
            return $http.get('/reviews', queryParams).then(function(res) {
                return res.data;
            });
        },
        // allows you to create a review using form data
        createReview: function(data) {
            return $http.post('/reviews/create', data).then(function(review) {
                return review.data;
            });
        }
    };
});
