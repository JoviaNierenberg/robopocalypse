'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Promise = require("bluebird");
var _ = require("lodash");
var path = require("path");
var fs = Promise.promisifyAll(require("fs"));
var ejs = require("ejs");
var mandrill = require("../sendEmail/mandrill.js");

module.exports = router;

router.get("/", function(req, res, next) {
	User.findOne(req.query).exec()
		.then(function(user){
			req.query.user = user.full_name;
			req.query.link = user.reset_link;
			return fs.readFileAsync(path.join(__dirname, "../sendEmail/emails/passwordReset.ejs"), 'utf8');
		}).then(function (template){
			var emailText = ejs.render(template, req.query)
			mandrill.sendEmail(req.query.user , req.query.email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Reset Your Password', emailText);
			res.end()
		}, next);
});

router.get("/key", function(req, res, next) {
	User.resetPass(req.query).then(function(user){
		res.json(_.omit(user.toJSON(), ['salt', 'password']));
	}, next);
});

