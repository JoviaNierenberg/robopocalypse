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
        }, function(err){
            console.log(err);
            res.send(404)
        })
        .then(null, next);
});

// get all orders
// >> fixed
router.get('/', function(req, res) {
    Order.find(req.query)
        // .populate({
        //     path: 'user',
        //     select: 'name'
        // })
        // .populate({
        //     path: 'product',
        //     select: 'title'
        // })
        .exec().then(function(orders) {
        res.json(orders)
    });
});

//get a single orders
router.get('/:orderId', function(req, res) {
    res.json(req.order);
});

// add order
router.post('/', function(req, res) {
	Order.create(req.body)
    .then(function (order){
        res.json(order)
    }, function(err) {
        if(err) res.send(err);
	});
});

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
            res.status(204).end();
        })
        .then(null, next);
});
