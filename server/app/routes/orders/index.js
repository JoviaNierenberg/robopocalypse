'use strict';
var router = require('express').Router();
require('../../../db/models');
var mongoose = require("mongoose");
// var Order = mongoose.schema("Order");

module.exports = router;


// get all orders
// >> fixed
router.get('/', function(res) {
    // Order.find().exec().then(function(orders) {
    //     res.json(orders)
    // });
});

//get a particular user's orders

router.get('/:userId', function(res, req) {
    // Order.find(req.query).exec().then(function(orders) {
    //     res.json(orders)
    // });
});

// add order
router.post('/', function(res, req) {
	console.log(req.body);
	res.send("ORDER POSTED");
})

// update order
router.put('/', function() {

});

// delete order
router.delete('/', function() {

});