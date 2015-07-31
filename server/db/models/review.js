'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    text: {
        type: String,
        required: true,
        minlength: 10
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
    // upVotes: {
    //     type: Number,
    //     default: 0
    // },
    // downVotes: {
    //     type: Number,
    //     default: 0
    // }
});

schema.virtual("reviewer_name").get(function(){
    
});

mongoose.model('Review', schema);
