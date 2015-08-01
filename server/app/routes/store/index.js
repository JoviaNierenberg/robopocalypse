"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");
var User = mongoose.model("User");

router.param("storeURL", function(req, res, next, storeURL) {
    User.findOne({storeURL: storeURL}).exec()
        .then(function(store) {
            if (!store) res.send(404);
            else {
                req.store = store;
                next();
            }
        }, function(err) {
            console.log(err);
            res.send(404);
        })
        .then(null, next);
});

//get all stores
router.get("/", function(req, res) {
    User.find({storeURL: {$exists: true}}).exec().then(function (users) {
        res.json(users)
    }, function(err){
        res.send(err)
    })
})

// get single store
router.get("/:storeURL", function(req, res) {
    console.log(req.store)
    Product.find({seller: req.store._id}).exec().then(function (products) {
        res.json(products)
    }, function(err){
        res.send(err)
    })
});

// add/update single store
router.put('/:storeURL', function(req, res, next) {
    for (var key in req.body) {
        req.store[key] = req.body[key];
    }
    req.store.save()
        .then(function(store) {
            res.json(store);
        })
        .then(null, next);
});

// delete store
router.delete("/:storeURL", function(req, res, next) {
    delete req.store.storeName
    delete req.store.storeURL
    delete req.store.storeDesc
    var index = req.store.roles.indexOf('Merchant')
    req.store.roles.splice(index, 1);
    if(req.store.roles.length === 0) req.store.roles.push('User')
    req.store.save()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});
