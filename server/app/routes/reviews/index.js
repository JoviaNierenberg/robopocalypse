'use strict';
var router = require('express').Router();
require('../../../db/models')
var mongoose = require("mongoose");
module.exports = router;
var Review = mongoose.model("Review");
var secur = require("../security");

router.param('reviewId', function(req, res, next, reviewId) {
    Review.findById(reviewId)
        .populate({
            path: 'user',
            select: 'name'
        })
        .populate({
            path: 'product',
            select: 'title'
        })
        .exec()
        .then(function(review) {
            if (!review) throw new Error("Review doesn't exist");
            else {
                req.review = review;
                next();
            }
        })
        .then(null, next);
});

//get all reviews
router.get('/', function(req, res) {
    console.log("req.query: ", req.query)
    Review
        .find(req.query)
        .populate({
            path: 'user',
            select: 'name'
        })
        .populate({
            path: 'product',
            select: 'title'
        })
        .exec().then(function (reviews) {
            res.json(reviews)
    })
})

// add a reviews
router.post('/create', secur.ensureAuthenticated, function(req, res) {
    Review.create(req.body)
        .then(function(review) {
            res.send(review);
        })
})

// get single review
router.get('/:reviewId', function(req, res) {
    res.json(req.review);
})

// update single review
router.put('/:reviewId', secur.isAdmin, function(req, res, next) {
     for (var key in req.body) {
        req.review[key] = req.body[key];
    }
    req.review.save()
        .then(function(review) {
            res.json(review);
        })
        .then(null, next);
})

// delete reviewId
router.delete('/:reviewId', secur.isAdmin, function(req, res, next) {
    req.review.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
})