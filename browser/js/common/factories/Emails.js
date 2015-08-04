'use strict';

app.factory('Emails', function($http) {
    return {
        // returns all users
        sendUserConfirmation: function(data) {
        	return $http.post('/api/send/userConfirmation', data);
        },
        sendPasswordReset: function(data){
        	return $http.post('/api/send/passwordReset', data);
        },
        sendOrderCreated: function(data){
        	return $http.post('/api/send/orderCreated', data);
        },
        sendOrderShipped: function(data){
        	return $http.post('/api/send/orderShipped', data);
        },
        sendOrderCancelled: function(data){
        	return $http.post('/api/send/orderCancelled', data);
        },
        sendOrderCompleted: function(data){
        	return $http.post('/api/send/orderCompleted', data);
        },
        sendMerchantAccepted: function(data){
        	return $http.post('/api/send/merchantAccepted', data);
        },
        sendMerchantOrder: function(data){
        	return $http.post('/api/send/merchantOrder', data);
        }
    };
});