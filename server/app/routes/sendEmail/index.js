'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var fs = require('fs');
var ejs = require("ejs");
var mandrill = require("./mandrill.js");

router.post("/userConfirmation", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/userConfirmation.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Please Confirm Your Registration', email)
	res.end()
});

router.post("/passwordReset", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/passwordReset.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Reset Your Password', email)
	res.end()
});

router.post("/orderCreated", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/orderCreated.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Order '+ id + ' Has Been Created', email)
	res.end()
});


router.post("/orderShipped", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/orderShipped.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Order '+ id + ' Has Been Shipped', email)
	res.end()
});

router.post("/orderCancelled", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/orderCancelled.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Order '+ id + ' Has Been Cancelled', email)
	res.end()
});

router.post("/orderCompleted", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/orderCompleted.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Order '+ id + ' Has Been Completed', email)
	res.end()
});

router.post("/merchantAccepted", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/merchantAccepted.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', storeName + ' Approved!', email)
	res.end()
});

router.post("/merchantOrder", function (req, res, next) {
	var emailTemplate = fs.readFileSync('../views/emails/merchantOrder.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'New Order for ' + storeName, email)
	res.end()
});