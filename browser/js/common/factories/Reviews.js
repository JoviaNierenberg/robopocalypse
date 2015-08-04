app.factory('Reviews', function($http, $rootScope) {
    var responseData = function(response){ return response.data; };
    return {
        // returns all reviews
        getReviews: function(query) {
            return $http.get('/api/reviews/', {params: query}).then(responseData);
        },
        // allows you to create a review using form data
        createReview: function(data) {
            return $http.post('/api/reviews/create', data).then(responseData);
        },
        // returns review based on ID
        getOne: function(id) {
            return $http.get('/api/reviews/' + id).then(responseData);
        },
        updateReview: function (id, review) {
            return $http.put("/api/reviews/" + id, review).then(responseData);
        },
        deleteReview: function (id) {
            return $http.delete("/api/reviews/" + id).then(function (res) {
                $rootScope.$emit("reviewUpdate");
                return res.data;
            })
        }
    };
});
