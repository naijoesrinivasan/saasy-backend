const express = require("express");
const TreeController = require("../controllers/tree.controller.js");
const router = express.Router();

const controller = new TreeController();

router.post("/add-child", async (req, res) => {
	const db = req.app.locals.db;
	const addChild = await controller.addChild(req.body.child, req.body.parentId, req.body.projectId, db);
	res.sendStatus(addChild);
});

router.post("/delete-child", async (req, res) => {
	const db = req.app.locals.db;
	const deleteChild = await controller.deleteChild(req.body.childId, req.body.parentId, db);
	res.sendStatus(deleteChild);
});

router.post("/edit-child", async (req, res) => {
	const db = req.app.locals.db;
	const editChild = await controller.editChild(req.body.child, db);
	res.sendStatus(editChild);
});

module.exports = router;
