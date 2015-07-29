'use strict';

app.factory('User', function($http){
	return {
		signup: function (credentials){
            return $http.post('/api/users/create', credentials)
                .then(function (response) {
                    return response.data;
                })
                .then(function (user) {
                    return user;
                });
        }
	}
})