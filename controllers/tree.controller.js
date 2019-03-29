const Constants = require("../constants");

class TreeController {
	async addChild(child, parentId, db) {
		child.children = [];
		const nodesCollection = db.collection(Constants.collections[2]);
		try {
			await nodesCollection.insertOne(child);
			let parentNode = await nodesCollection.findOne({
				_id: parentId
			});

			if (parentNode) {
				let children = parentNode.children;
				children.push(child);
				parentNode.children = children;
				await nodesCollection.replaceOne({ _id: parentId }, parentNode);
			}
		} catch (error) {
			console.error(error);
			return 500;
		}

		return 200;
	}

	async getTrees(userId) {
		try {
			const treesCollection = db.collections(Constants.collections[1]);
			treesCollection.findAll({ userId: userId });
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

module.exports = TreeController;
