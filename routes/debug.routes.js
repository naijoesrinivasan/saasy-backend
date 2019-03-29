const express = require("express");
const TreeController = require("../controllers/tree.controller.js");
const router = express.Router();

const controller = new TreeController();

router.post("/delete-collection", async (req, res) => {
	try {
		const db = req.app.locals.db;
		const collection = db.collection(req.body.targetCollection);
		await collection.remove();
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
	res.sendStatus(200);
});

module.exports = router;
