'use strict';
var mongoose = require('mongoose');
var searchPlugin = require("mongoose-search-plugin");

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return parseFloat(num.replace(/[^0-9-.]/g, '')) * 100;
}

function uniqueAndOne(arr){
    var strainedArr = [];
    for(var i in arr){
        if(strainedArr.indexOf(arr[i]) === -1) {
            strainedArr.push(arr[i]);
        }
    }
    if(strainedArr.length === 0){
        strainedArr.push("http://wiki.solid-run.com/images/7/75/No_image_available.png");
    }
    return strainedArr;
}



var schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        set: setPrice,
        get: getPrice
    },
    inventory: {
        type: Number,
        required: true
    },
    category: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }]
    },
    photos: {
        type: [String],
        set: uniqueAndOne,
        default: ["http://wiki.solid-run.com/images/7/75/No_image_available.png"]
    }
});

schema.path('category').validate(function(value){
    return (value.length !== 0);
}, 'No category added');

schema.virtual('shortDesc').get(function() {
    return this.description.substring(0, 200);
});

schema.plugin(searchPlugin, {
    fields: ["title", "description"]
})

mongoose.model('Product', schema);
