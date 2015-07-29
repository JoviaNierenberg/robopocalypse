"use strict";
var mongoose = require("mongoose");

var itemize = function (items) {
	var dbItems = {};
	for(var item in items) {
		console.log(item);
		dbItems[items[item].product._id] = items[item].quantity;
	}
	return dbItems;
}


var schema = new mongoose.Schema({
    buyer: {type: String, required: true},
    // This vvvv doesn't seem like the best way to do this, 
    // each set of items is an object with the form {(Objectid(1): quantity, Objectid(2): quantity}
    items: {type: Object, required: true, set: itemize},
    status: {type: String, default: "Created"}
});

mongoose.model("Order", schema);
