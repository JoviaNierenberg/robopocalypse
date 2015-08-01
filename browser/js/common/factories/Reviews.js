app.factory('Reviews', function($http, $rootScope) {
    return {
        // returns all reviews
        getReviews: function(query) {
        return $http.get('/api/reviews/', {params: query}).then(function(res) {
                return res.data;
            });
        },
        // allows you to create a review using form data
        createReview: function(data) {
            console.log("data: ", data)
            return $http.post('/api/reviews/create', data).then(function(review) {
                return review.data;
            });
        },
        // returns review based on ID
        getOne: function(id) {
          return $http.get('/api/reviews/' + id).then(function(res) {
            return res.data;
          });
        },
        updateReview: function (id, review) {
            return $http.put("/api/reviews/" + id, review).then(function(res){
                return res.data;
            });
        },
        deleteReview: function (id) {
            return $http.delete("/api/reviews/" + id).then(function (res) {
                $rootScope.$emit("reviewUpdate");
                return res.data;
            })
        }
    };
});
