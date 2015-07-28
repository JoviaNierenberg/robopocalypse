app.factory('Categories', function() {
  return {
    // returns all categories
    getAll: function() {
      return $http.get('/categories').then(function(response) {
        return response.data;
      });
    },
    // creates a category using the name of category only
    createCategory: function() {
      return $http.post('/categories', { name: data.name }).then(function(response) {
        return response.data;
      });
    }
  };
});