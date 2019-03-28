const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log(req);
	res.send("Hello there.");
	// TODO: Use req object to determine projects user is associated with and return that info
});

// TODO: Change from placeholder 'project' to real project name
router.get("/project", (req, res) => {});

module.exports = router;
