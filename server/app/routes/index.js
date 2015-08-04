"use strict";
var router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use("/categories", require("./categories"));
router.use("/reviews", require("./reviews"));
router.use("/store", require("./store"));
router.use("/search", require("./search"));
router.use("/reset", require("./reset"));

router.put("/cart", function (req, res) {
	req.session.cart = req.body;
	req.session.save();
	res.send(200);
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.sendStatus(404).end();
});
