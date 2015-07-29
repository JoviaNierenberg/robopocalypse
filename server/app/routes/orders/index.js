'use strict';
var router = require('express').Router();
require('../../../db/models');
var mongoose = require("mongoose");
var Order = mongoose.model("Order");

module.exports = router;


// get all orders
// >> fixed
router.get('/', function(req, res) {
    // Order.find().exec().then(function(orders) {
    //     res.json(orders)
    // });
});

//get a particular user's orders

router.get('/:userId', function(req, res) {
    // Order.find(req.query).exec().then(function(orders) {
    //     res.json(orders)
    // });
});

// add order
router.post('/', function(req, res) {
	Order.create({items: req.body.items, buyer: "Isaac"}, function (err, order) {
		if(err) res.send(err);
		res.send(order);
	});
	
})

// update order
router.put('/', function() {

});

// delete order
router.delete('/', function() {

});