"use strict";
var mongoose = require("mongoose");
var Promise = require('bluebird');
var Product = Promise.promisifyAll(mongoose.model('Product'));

var itemize = function(items) {
    var dbItems = {products: [], prices: [], quantities: [] };

    Promise.each(Object.keys(items), function(item){
        return Product.findOneAsync({'_id': items[item].product._id})
            .then(function(product){
                product.inventory -= items[item].quantity
                product.save()
            });
    })

    for (var item in items) {
            dbItems.products.push(items[item].product._id);
            dbItems.quantities.push(items[item].quantity);
            dbItems.prices.push(items[item].product.price);
        }
    return dbItems;

};

// var cartize = function(items) {
//     var dbItems = {};
//     console.log(items);
//     for (var item in items) {
//         Product.findById(item).exec().then(function(product) {
//             var input = {};
//             input[product] = items[item];
//             dbItems[product.title] = input;
//         });
//     }
//     return dbItems;
// };

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
    sellers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
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

        type: {
            products: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }],
            prices: {
                type: [Number],
                required: true
            },
            quantities: {
                type: [Number],
                required: true
            }
        },
        set: itemize
    },
    subtotal: {
        type: Number,
        required: true
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

schema.statics.findFullOrders = function (query) {
    return this.find(query)
        .populate({
            path: 'items.products',
            select: "title photos",
            model: Product
        })
        .populate({
            path: 'sellers',
            select: 'storeName'
        }).exec();
}



mongoose.model("Order", schema);