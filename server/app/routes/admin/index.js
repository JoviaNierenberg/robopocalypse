'use strict';
var router = require('express').Router();
require('../../../db/models');
var mongoose = require("mongoose");
var Admin = mongoose.model("User");
module.exports = router;

router.param('productId', function(req, res, next, productId) {
    Product.findById(productId).exec()
        .then(function(product) {
            if (!product) throw new Error("Product doesn't exist");
            else {
                req.product = product;
                next();
            }
        })
        .then(null, next);
});

//get all products
router.get('/', function(req, res) {
    Product.find().exec().then(function(products) {
        res.json(products);
    });
});

// add a products
router.post('/', function(req, res) {
    Product.create(req.body)
        .then(function(product) {
            res.send(product);
        });
});

// get single product
router.get('/:productId', function(req, res) {
    res.json(req.product);
});

// update single product
router.put('/:productId', function(req, res, next) {
    req.product.save()
        .then(function(product) {
            res.json(product);
        })
        .then(null, next);
});

// delete productId
router.delete('/:productId', function(req, res, next) {
    req.product.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
});