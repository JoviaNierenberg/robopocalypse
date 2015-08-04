'use strict';

app.factory('Emails', function($http, $rootScope) {
    return {
        // returns all users
        sendUserConfirmation: function() {
        	return $http.get('/api/send/userConfirmation');
        },
        sendPasswordReset: function(){
        	return $http.get('/api/send/passwordReset');
        },
        sendOrderCreated: function(){
        	return $http.get('/api/send/orderCreated');
        },
        sendOrderShipped: function(){
        	return $http.get('/api/send/orderShipped');
        },
        sendOrderCancelled: function(){
        	return $http.get('/api/send/orderCancelled');
        },
        sendOrderCompleted: function(){
        	return $http.get('/api/send/orderCompleted');
        },
        sendMerchantAccepted: function(){
        	return $http.get('/api/send/merchantAccepted');
        },
        sendMerchantOrder: function(){
        	return $http.get('/api/send/merchantOrder');
        }
    };
});