'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    dates: {
        start: {
            type: Date, 
            required: true
        },
        end: {
            type: Date, 
            required: true
        }
    },
    details: {
        type: String,
        required: true
    }
});

mongoose.model('Coupon', schema);
