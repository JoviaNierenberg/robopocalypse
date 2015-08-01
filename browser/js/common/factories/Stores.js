app.factory('Stores', function($http, $rootScope) {
    return {
        // returns all stores
        getAll: function(){
            return $http.get('/api/store').then(function(res){
                return res.data
            })
        },
        getStore: function(url) {
            return $http.get('/api/store/' + url).then(function(res) {
                    return res.data;
                });
        },
    };
});
