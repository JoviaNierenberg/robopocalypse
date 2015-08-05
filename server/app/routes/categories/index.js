"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
var Category = mongoose.model("Category");
var secur = require("../security");

module.exports = router;

router.param('category', function (req, res, next, category) {
    Category.findById(category).exec()
        .then(function (cat) {
            if (!cat) throw new Error("Category doesn't exist");
            else {
                req.category = cat;
                next();
            }
        }, function(err){
                err.status = 404
                next(err)
        })
        .then(null, next);
});

// get all categories
router.get("/", function (req, res, next) {
	Category.find().exec().then(function (categories) {
		res.json(categories);
	}, next);
});

router.get("/:category", function (req, res) {
    res.json(req.category);
});

// add category
router.post("/", secur.isAdmin, function(req, res) {
	Category.create({name: req.body.name})
    .then(function(category){
        res.send(category)
    }, function(err){
        res.send(err)
    })
})

// update category
router.put("/:category", secur.isAdmin, function (req, res, next) {
	for(var key in req.body){
        req.category[key] = req.body[key];
    }
    req.category.save()
        .then(function(category) {
            res.json(category);
        })
        .then(null, next);
});

// delete category
router.delete("/:category", secur.isAdmin, function(req, res, next) {
	req.category.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
});
