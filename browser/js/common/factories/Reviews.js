app.factory('Reviews', function ($http) {
    return { getReviews: function (user, id) {
        var queryParams ={};
        if(user){
            queryParams.user = id
        }else {
            queryParams.product = id
        }

        return $http.get('/reviews', queryParams).then(function(res){
            return res.data
        })
    } };
});