app.factory('Orders', function($http) {
  return {
    // get orders by product id
    getOrdersById: function(id) {
      return $http.get('/orders' + id).then(function(response) {
        return response.data;
      });
    },
    // get orders based on user
    getOrdersByUser: function() {
      return $http.get('/orders' + userId).then(function(response) {
        return response.data;
      });
    },
    // get orders based on seller
    getOrdersBySeller: function() {
      return $http.get('/orders' + sellerId).then(function(response) {
        return response.data;
      });
    }
  };
});