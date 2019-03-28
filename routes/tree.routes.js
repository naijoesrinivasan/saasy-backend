const express = require("express");
const router = express.Router();

router.post("/add-child", (req, res) => {
	console.log(req.body);
	res.send("Hello there.");
	// TODO: Use req object to determine projects user is associated with and return that info
});

router.post("/delete-child", (req, res) => {});

router.post("/edit-child", (req, res) => {});

module.exports = router;
