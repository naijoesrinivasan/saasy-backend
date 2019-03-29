const express = require("express");
const TreeController = require("../controllers/tree.controller.js");
const router = express.Router();

const controller = new TreeController();

router.post("/add-child", async (req, res) => {
	const db = req.app.locals.db;
	console.log(req.body);
	const addChild = await controller.addChild(req.body.child, req.body.projectId, db);
	res.send(addChild);
});

router.post("/delete-child", (req, res) => {});

router.post("/edit-child", (req, res) => {});

module.exports = router;
