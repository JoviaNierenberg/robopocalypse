app.factory('Signup', function($http) {
  return {
    createUser: function(data) {
      console.log("Signup factory form data", data);
      return $http.post('/api/signup', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      }).then(function(response) {
        return response.data;
      });
    }
  };
});