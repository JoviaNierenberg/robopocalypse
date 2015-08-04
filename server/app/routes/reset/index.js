'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var _ = require("lodash");

module.exports = router;

router.get("/", function(req, res, next) {
	User.find(req.query).exec()
		.then(function(user){

			//send email with link
			//email link will send them to a form which will allow them to reset their pass at the address below vvv
			//alternatively we could reset their pass for them and send them an email with the new pass, but I want to use
			//a link to a form bc I think it's cooler
			res.send(user.reset_link); //not this (send in email)
			res.sendStatus(200);
		}, next);
});

router.get("/key", function(req, res, next) {
	User.resetPass(req.query).then(function(user){
		res.json(_.omit(user.toJSON(), ['salt', 'password']));
	}, next);
})

