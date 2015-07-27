'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory: {
        type: Number
    },
    category: {
        type: CategoryDocument
    },
    photo: {
        type: String,
        default:
    }
});

mongoose.model('Product', schema);