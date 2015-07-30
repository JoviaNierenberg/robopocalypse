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

// var isAdmin = function (req, res, next) {
//     User.findById(req.session.passport.user)
//     .exec().then(next, function(){res.status(403).end})
// };

// //for admin to see all users
// router.get("/", isAdmin, function (req, res) {
//     User.find(req.query).then(function (users) {
//         res.send(users);
//     }, function (err) {
//         console.log(err);
//         res.status(403).end();
//     });
// });

router.get("/:userid", ensureAuthenticated, function (req, res) {
    User.findById(req.params.userid).then(function (user) {
        res.send(user);
    }, function (err) {
        console.log(err);
        res.status(401).end();
    });
});

router.post('/create', function (req, res, next) {
    User.create(req.body)
    .then(function (user) {
        req.login(user, function () {
            res.status(201).json(user);
        });
    })
    .then(null, next);
});

