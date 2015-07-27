'use strict';
var router = require('express').Router();
var Product = require('../../../db/models/product')
module.exports = router;
var _ = require('lodash');

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
router.get('/', function(req, res, next) {
    Product.find().exec().then(function(products) {
        res.json(products)
    })
})

// add a products
router.post('/', function(req, res, next) {
    Product.create(req.body)
        .then(function(product) {
            //
        })
})

// get single product
router.get('/:productId', function(req, res, next) {
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