"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");

router.get('/', function(req, res, next) {
    var wordRegExp = new RegExp(req.query.searchStr, "i");
    if (!req.query.category) {
        Product.find({
            title: wordRegExp
        }).exec().then(function(products) {
            res.send(products);
        }).then(null, next);
    } else {
        Product.find({
                title: wordRegExp,
                category: req.query.category._id
            })
            .exec()
            .then(function(products) {
                res.send(products);
            }).then(null, next);
    }
});
