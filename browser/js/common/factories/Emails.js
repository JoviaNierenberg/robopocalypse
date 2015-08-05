'use strict';

app.factory('Emails', function($http) {
    var responseData = function(response){ return response.data; };
    return {
        // returns all users
        sendUserConfirmation: function(data) {
        	return $http.post('/api/send/userConfirmation', data).then(responseData);
        },
        sendPasswordReset: function(data){
        	return $http.post('/api/send/passwordReset', data).then(responseData);
        },
        sendOrderCreated: function(data){
        	return $http.post('/api/send/orderCreated', data).then(responseData);
        },
        sendOrderShipped: function(data){
        	return $http.post('/api/send/orderShipped', data).then(responseData);
        },
        sendOrderCancelled: function(data){
        	return $http.post('/api/send/orderCancelled', data).then(responseData);
        },
        sendOrderCompleted: function(data){
        	return $http.post('/api/send/orderCompleted', data).then(responseData);
        },
        sendMerchantAccepted: function(data){
        	return $http.post('/api/send/merchantAccepted', data).then(responseData);
        },
        sendMerchantOrder: function(data){
            return data.forEach(function(merchant){
                return $http.post('/api/send/merchantOrder', data).then(responseData);
            })
        },
        sendMerchantRequest: function(data){
            return $http.post('/api/send/merchantRequest', {sellers: data}).then(responseData);
        }
    };
});