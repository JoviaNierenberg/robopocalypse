"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
// var Category = mongoose.schema("Category");

module.exports = router;


// get all categories
// >> fixed
router.get("/:category", function(res, req) {
    // Category.find(req.query).exec().then(function(categories) {
    //     res.json(categories)
    // });
});

// add category
router.post("/", function() {

})

// update category
router.put("/", function() {

});

// delete category
router.delete("/", function() {

});