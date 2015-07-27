'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Integer
    },
    inventory: {
        type: Integer
    },
    category: {
        type: String
    },
    photo: {
        type: Array,
        default:
    }
});

mongoose.model('Product', schema);