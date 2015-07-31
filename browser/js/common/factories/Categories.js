app.factory('Categories', function($http) {
  return {
    // returns all categories
    getAll: function() {
      return $http.get('/api/categories').then(function(response) {
        return response.data;
      });
    },
    // creates a category using the name of category only
    createCategory: function(catName) {
      return $http.post('/api/categories', { name: catName }).then(function(response) {
        return response.data;
      });
    },
    deleteCategory: function(catName) {
      return $http.delete('api/categories', { name: catName}).then(function(response) {
        console.log("Category succesfully deleted.");
      });
    }
  };
});