const Constants = require("../constants");
const uuid = require("uuid/v1");

class TreeController {
	async addChild(child, projectId, db) {
		const childId = uuid();
		child._id = childId;
		const treeCollection = db.collection(Constants.collections[1]);
		try {
			let tree = await treeCollection.findOne({ _id: projectId });
			if (!tree) {
				tree = {
					_id: uuid(),
					root: childId,
					projectId: projectId,
					children: []
				};
				await treeCollection.insertOne(tree);
			}
			const nodesCollection = db.collection(Constants.collections[2]);
			await nodesCollection.insertOne(child);
			let children = tree.children;
			children.push(child);
			tree.children = children;
			await treeCollection.replaceOne({ _id: tree._id }, tree);
		} catch(error) {
			console.error(error);
			return 500;
		}

		return 200;
	}

	async getTrees(projectId) {
		try {
			const treeCollection = db.collections(Constants.collections[1]);
			treeCollection.findAll({ projectId: projectId });
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

module.exports = TreeController;
