"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");
var User = mongoose.model("User");
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
var path = require("path");
var ejs = require("ejs");
var sass = Promise.promisifyAll(require("node-sass"));
var _ = require("lodash");

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
    User.find({storeURL: {$exists: true}, roles:{$all: 'Merchant'}}).exec().then(function (users) {
        users = users.map(function (user) {
            return _.omit(user.toJSON(), ['salt', 'password']);
        });
        res.json(users)
    }, function(err){
        res.send(err)
    })
})

// get single store
router.get("/:storeURL", function(req, res) {

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

router.post("/customTheme/:storeURL", function(req, res, next) {
    req.body.storeURL = req.params.storeURL;
    fs.readFileAsync(path.join(__dirname, "./scssTemplate.ejs"), "utf8").then(function(template){
        var customScss = ejs.render(template, req.body);
        return sass.renderAsync({data: customScss});
    }).then(function (renderedcss) {
        return fs.writeFileAsync(path.join(__dirname, "../../../../browser/custom/", req.params.storeURL + ".css"), renderedcss.css, {encoding: "utf8"});
    }).then(function () {
        res.sendStatus(200);
    }, next);
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
