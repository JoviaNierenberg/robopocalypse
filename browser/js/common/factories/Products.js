app.factory("Products", function($http) {
  var productID = '';
  return {
    // returns all products
    getAll: function(query) {
      return $http.get('/api/products', {params: query}).then(function(response) {
        return response.data;
      });
    },
    // creates a product using form data
    createProduct: function(data) {
      // is there an easier way to create a product using all the data inputted into the form?
      return $http.post('/api/products/create', {
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        inventory: data.inventory,
        photo: data.photo // IDK about this
      }).then(function(response) {
        return response.data;
      });
    },
    // returns product based on ID
    getOne: function(id) {
      return $http.get('/api/products/' + id).then(function(response) {
        productID = id;
        return response.data;
      });
    },
    // deletes product based on ID
    deleteProduct: function(id) {
      return $http.delete('/api/products/' + id).then(function(response) {
        console.log(response, "Product with ID of " + id + " was successfully deleted.");
      });
    },
    // updates product using form data
    // is there an easier way to update a product using all the data inputted into the form?
    updateProduct: function(data) {
      return $http.post('/api/products/update', {
        _id: productID,
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        inventory: data.inventory
      }).then(function(response) {
        return response.data;
      });
    }
  };
});