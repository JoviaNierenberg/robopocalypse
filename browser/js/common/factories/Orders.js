app.factory('Orders', function($http) {
  return {
    // get orders by product id
    getOrdersById: function(id) {
      return $http.get('/api/orders/' + id).then(function(response) {
        return response.data;
      });
    },
    // get orders based on user
    getOrdersByUser: function(userId) {
      return $http.get('/api/orders/user/' + userId).then(function(response) {
        return response.data;
      });
    },
    // get orders based on seller
    getOrdersBySeller: function(sellerId) {
      return $http.get('/api/orders/' + sellerId).then(function(response) {
        return response.data;
      });
    }
  };
});