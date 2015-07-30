'use strict';

app.factory('User', function($http) {
    var userID = '';
    return {
        // returns all users
        getAll: function() {
            return $http.get('/api/users').then(function(response) {
                return response.data;
            });
        },
        // get single user
        getOne: function(id) {
            return $http.get('/api/users/' + id).then(function(response) {
                userID = id;
                return response.data;
            });
        },
        // deletes user based on ID
        deleteUser: function(id) {
            return $http.delete('/api/users' + id).then(function(response) {
                console.log(response, "User with ID of " + id + " was succesfully deleted.");
            });
        },
        // updates user based on form data
        updateUser: function(data) {
            return $http.post('/api/users/update', data)
                .then(function(response) {
                    return response.data;
                })
                .then(function(user) {
                    return user;
                });
        },
        // signs up the user
        signup: function(credentials) {
            return $http.post('/api/users/create', credentials)
                .then(function(response) {
                    return response.data;
                })
                .then(function(user) {
                    return user;
                });
        }
    };
});
