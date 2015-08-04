app.factory('Orders', function($http, Emails) {
  return {
    // get orders by order id
    getOrdersById: function(id) {
      return $http.get('/api/orders/' + id).then(function(response) {
        return response.data;
      });
    },
    // get orders based on user
    getOrdersByUser: function(email) {
      return $http.get('/api/orders/', {params: {buyer: email}}).then(function(response) {
        return response.data;
      });
    },
    // get orders based on seller
    getOrdersByMerchant: function(sellerId) {
      return $http.get('/api/orders/', {params: {seller: sellerId}}).then(function(response) {
        return response.data;
      });
    },
    updateOrder: function(order) {
      return $http.put('/api/orders/'+order._id, order).then(function(response) {
        switch(response.data.status){
          case 'Processing':
            Emails.sendOrderShipped(response.data).then(function(){
              return response.data
            })
            break;
          case 'Cancelled':
            Emails.sendOrderCancelled(response.data).then(function(){
              return response.data
            })
            break;
          case 'Complete':
            Emails.sendOrderCompleted(response.data).then(function(){
              return response.data
            })
            break;
          default:
            return response.data;
        }
      });
    },
  };
});