"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
var Category = mongoose.model("Category");

module.exports = router;

router.param('category', function (req, res, next, category) {
    Category.findOne({name: category}).exec()
        .then(function (cat) {
            if (!category) throw new Error("Category doesn't exist");
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

router.get("/:category", function (req, res, next) {
    if(req.category) {
    	res.json(req.category);
    }else{
    	next();
    }
});

// add category
router.post("/", function(req, res) {
	Category.create({name: req.body.name}, function (err, category) {
		if(err) res.send(err);
		res.send(category);
	});
})

// update category
router.put("/:category", function (req, res, next) {
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
router.delete("/:category", function(req, res, next) {
	req.category.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
});
