"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");

router.get("/:searchString", function (req, res) {
	var searches = req.params.searchString.split("%/20")
});
