'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

var error = function (err) {
    console.log(err);
    res.status(401).end();
}

router.get("/:userid", ensureAuthenticated, function (req, res) {
    User.findById(req.params.userid).then(function (user) {
        res.send(user);
    }, error);
});

