'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var _ = require("lodash");
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

var isAdmin = function (req, res, next) {
    User.findById(req.session.passport.user._id)
    .exec().then(next, function(){res.status(403).end})
};

router.param('userid', function(req, res, next, userid) {
    User.findById(userid).exec()
        .then(function(user) {
            if (!user) throw new Error("User doesn't exist");
            else {
                req.user = _.omit(user.toJSON(), ['salt', 'password']);
                next();
            }
        })
        .then(null, next);
});

// //for admin to see all users
router.get("/", isAdmin, function (req, res) {
    User.find(req.query).then(function (users) {
        users = users.map(function (user) {
            return _.omit(user.toJSON(), ['salt', 'password']);
        });
        res.send(users);
    }, function (err) {
        console.log(err);
        res.status(403).end();
    });
});

router.get("/:userid", ensureAuthenticated, function (req, res) {
    res.send(req.user);
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

router.delete("/:userid", function (req, res, next) {
    req.user.remove().then(function () {
        res.send(200)
    }, next);
})


