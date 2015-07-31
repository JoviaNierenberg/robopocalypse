app.factory('Reviews', function($http) {
    return {
        // returns all reviews
        getReviews: function(query) {
        return $http.get('/api/reviews/', {params: query}).then(function(res) {
                return res.data;
            });
        },
        // allows you to create a review using form data
        createReview: function(data) {
            return $http.post('/api/reviews/create', data).then(function(review) {
                return review.data;
            });
        },
        // returns review based on ID
        getOne: function(id) {
          return $http.get('/api/reviews/' + id).then(function(res) {
            // reviewID = id;
            return res.data;
          });
        }
    };
});
