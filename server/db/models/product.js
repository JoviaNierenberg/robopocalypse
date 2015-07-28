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
        type: [mongoose.Schema.Types.ObjectId]
    },
    photo: {
        type: String,
        default: "http://wiki.solid-run.com/images/7/75/No_image_available.png"
    }
});


mongoose.model('Product', schema);
