"use strict";
var mongoose = require("mongoose");
require('../../../server/db/models');

var Product = mongoose.model('Product')


var itemize = function (items) {
	var dbItems = {};
	for(var item in items) {
		console.log(item);
		dbItems[items[item].product._id] = items[item].quantity;
	}
	return dbItems;
}

var cartize = function(items){
	var dbItems = {};
	for(var item in items){
		Product.findById(item).exec().then(function(product){
			var input = {}
			input[product] = items[item]
			dbItems[product.title] = input
		})
	}
	return dbItems
}

var schema = new mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, required: true},
 	billing: {type: String, required: true},
 	shipping: {type: String},
    // This vvvv doesn't seem like the best way to do this, 
    // each set of items is an object with the form {(Objectid(1): quantity, Objectid(2): quantity}
    items: {type: Object, required: true, get: cartize, set: itemize},
    price: {type: Number, required: true},
    status: {type: String, default: "Created"}
});

mongoose.model("Order", schema);
