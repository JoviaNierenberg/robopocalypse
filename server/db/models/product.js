'use strict';
var mongoose = require('mongoose');
require('../../../server/db/models');

var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory: {
        type: Number,
        require: true
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    photo: {
        type: String,
        default: "http://wiki.solid-run.com/images/7/75/No_image_available.png"
    }
});

schema.virtual('shortDesc').get(function() {
    return this.description.substring(0, 200);
});

schema.methods.getReviews = function() {
    mongoose.model('Review').find({
        product: this._id
    }).then(function(reviews) {
        return reviews;
    });
};

mongoose.model('Product', schema);
