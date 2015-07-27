'use strict';
var router = require('express').Router();
var Product = require('../../../db/models/product')
module.exports = router;
var _ = require('lodash');

// get all categories
router.get('/', function() {
    models.Category.find(req.query).exec().then(function(categories) {
        req.json(categories)
    });
});

// add category
router.post('/', function() {

})

// update category
router.put('/', function() {

});

// delete category
router.delete('/', function() {

});