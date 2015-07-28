'use strict';
var router = require('express').Router();
require('../../../db/models')
var mongoose = require("mongoose");
module.exports = router;
var _ = require('lodash');
var Product = mongoose.model("Product");

router.param('productId', function(req, res, next, productId) {
    Product.findById(productId).exec()
        .then(function(product) {
            if (!product) throw HttpError(404);
            else {
                req.product = product;
                next();
            }
        })
        .then(null, next);
});

//get all products
router.get('/', function(req, res) {
    Product.find().exec().then(function (products) {
        console.log(products);
        res.json(products)
    })
})

// add a products
router.post('/', function(req, res) {
    Product.create(req.body)
        .then(function(product) {
            //
        })
})

// get single product
router.get('/:productId', function(req, res) {
    res.json(req.product);
})

// update single product
router.put('/:productId', function(req, res, next) {
    req.product.save()
        .then(function(product) {
            res.json(product);
        })
        .then(null, next);
})

// delete productId
router.delete('/:productId', function(req, res, next) {
    req.product.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
})