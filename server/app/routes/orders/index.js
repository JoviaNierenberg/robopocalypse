'use strict';
var router = require('express').Router();
require('../../../db/models');
var mongoose = require("mongoose");
var Order = mongoose.model("Order");

module.exports = router;


router.param('orderId', function(req, res, next, orderId) {
    Order.findById(orderId).exec()
        .then(function(order) {
            if (!order) throw new Error("Order doesn't exist");
            else {
                req.order = order;
                next();
            }
        })
        .then(null, next);
});

// get all orders
// >> fixed
router.get('/', function(req, res) {
    Order.find().exec().then(function(orders) {
        res.json(orders)
    });
});

//get a particular user's orders

router.get('/:userId', function(req, res) {
    Order.find({buyer: req.params.userId}).exec().then(function(orders) {
        res.json(orders)
    });
});

// add order
router.post('/', function(req, res) {
	Order.create({items: req.body.items, buyer: "Isaac"}, function (err, order) {
		if(err) res.send(err);
		res.send(order);
	});
})

// update order
router.put('/:orderId', function(req, res, next) {
    for(var key in req.body){
        req.order[key] = req.body[key];
    }
    req.order.save()
        .then(function(order) {
            res.json(order);
        })
        .then(null, next);
});

// delete order
router.delete('/:orderId', function(req, res, next) {
    req.order.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
});