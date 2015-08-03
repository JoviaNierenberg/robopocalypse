"use strict";
var mongoose = require("mongoose");

var Product = mongoose.model('Product');

var itemize = function(items) {
    var dbItems = {};
    var counter = 0;
    for (var item in items) {
        var addItem = {}
        addItem.product = items[item].product._id
        addItem.quantity = items[item].quantity;
        addItem.price = items[item].product.price
        dbItems[counter++] = addItem
    }
    return dbItems;
};

var cartize = function(items) {
    var dbItems = {};
    for (var item in items) {
        Product.findById(item).exec().then(function(product) {
            var input = {};
            input[product] = items[item];
            dbItems[product.title] = input;
        });
    }
    return dbItems;
};

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

var schema = new mongoose.Schema({
    //using email so guests can make orders as well
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date:{
        type: Date,
        default: Date.now
    },
    billing: {
        type: String,
        required: true
    },
    shipping: {
        type: String
    },
    // This vvvv doesn't seem like the best way to do this,
    // each set of items is an object with the form {(Objectid(1): quantity, Objectid(2): quantity}
    items: {
        type: Object,
        required: true,
        get: cartize,
        set: itemize
    },
    subtotal: {
        type: Number,
        required: true,
        get: getPrice,
        set: setPrice
    },
    status: {
        type: String,
        enum: ['Created', 'Processing', 'Cancelled', 'Complete'],
        default: 'Created'
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
    }
});

mongoose.model("Order", schema);