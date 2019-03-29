const express = require("express");
const router = express.Router();
const TreeController = require("../controllers/tree.controller.js");

const controller = new TreeController();

router.get("/", (req, res) => {
	console.log(req);
	res.send("Hello there.");
	// TODO: Use req object to determine projects user is associated with and return that info
});

router.get("/user/:projectId", async (req, res) => {
	const db = req.app.locals.db;
	const tree = await controller.getTree(req.params.projectId, db);
	res.send(tree);
})

module.exports = router;
