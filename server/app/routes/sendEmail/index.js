'use strict';
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var fs = require('fs');
var ejs = require("ejs");
var mandrill = require("./mandrill.js");
module.exports = router;


// router.post("/userConfirmation", function (req, res, next) {
// 	var emailTemplate = fs.readFileSync('../views/emails/userConfirmation.ejs', 'utf8')
// 	var email = ejs.render(emailTemplate, req.body)
// 	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Please Confirm Your Registration', email)
// 	res.end()
// });

router.post("/orderCreated", function (req, res, next) {
	var emailTemplate = fs.readFileSync(__dirname + '/emails/orderCreated.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	var billing = req.body.billing.split(" ")
	var name = billing[0] + billing[1]
	mandrill.sendEmail(name, req.body.buyer, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'Order '+ req.body._id + ' Has Been Created', email)
	res.status(201).end()
	
});


router.post("/orderShipped", function (req, res, next) {
	var emailTemplate = fs.readFileSync(__dirname + '/emails/orderShipped.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	var billing = req.body.billing.split(" ")
	var name = billing[0] + billing[1]
	mandrill.sendEmail(name, req.body.buyer, 'Robopocalypse', '24_7workingRobot@robopocalypse.com', 'Order '+ req.body._id + ' Has Been Shipped', email)
	res.status(201).end()
});

router.post("/orderCancelled", function (req, res, next) {
	var emailTemplate = fs.readFileSync(__dirname + '/emails/orderCancelled.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	var billing = req.body.billing.split(" ")
	var name = billing[0] + billing[1]
	mandrill.sendEmail(name, req.body.buyer, 'Robopocalypse', 'evilRobot@robopocalypse.com', 'Order '+ req.body._id + ' Has Been Cancelled', email)
	res.status(201).end()
});

router.post("/orderCompleted", function (req, res, next) {
	var emailTemplate = fs.readFileSync(__dirname + '/emails/orderCompleted.ejs', 'utf8')
	var email = ejs.render(emailTemplate, req.body)
	var billing = req.body.billing.split(" ")
	var name = billing[0] + billing[1]
	mandrill.sendEmail(name, req.body.buyer, 'Robopocalypse', 'happyRobot@robopocalypse.com', 'Order '+ req.body._id + ' Has Been Completed', email)
	res.status(201).end()
});

// router.post("/merchantAccepted", function (req, res, next) {
// 	var emailTemplate = fs.readFileSync('../views/emails/merchantAccepted.ejs', 'utf8')
// 	var email = ejs.render(emailTemplate, req.body)
// 	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', storeName + ' Approved!', email)
// 	res.end()
// });

// router.post("/merchantOrder", function (req, res, next) {
// 	var emailTemplate = fs.readFileSync('../views/emails/merchantOrder.ejs', 'utf8')
// 	var email = ejs.render(emailTemplate, req.body)
// 	mandrill.sendEmail(to_name, to_email, 'Robopocalypse', 'robopocalypse_admin@robopocalypse.com', 'New Order for ' + storeName, email)
// 	res.end()
// });