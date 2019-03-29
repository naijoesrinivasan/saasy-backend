const Constants = require("../constants");
const ObjectId = require("mongodb").ObjectId;

class TreeController {
	async addChild(child, parentId, db) {
		child.children = [];
		const nodesCollection = db.collection(Constants.collections[2]);
		try {
			const childId = String(
				(await nodesCollection.insertOne(child)).ops[0]._id
			);
			let parentNode = await nodesCollection.findOne({
				_id: new ObjectId(parentId)
			});

			if (parentNode && childId) {
				let children = parentNode.children;
				children.push(childId);
				parentNode.children = children;
				await nodesCollection.replaceOne(
					{ _id: new ObjectId(parentId) },
					parentNode
				);
			}
		} catch (error) {
			console.error(error);
			return 500;
		}

		return 200;
	}

	async deleteChild(childId, parentId, db) {
		const nodesCollection = db.collection(Constants.collections[2]);
		try {
			await nodesCollection.deleteOne({ _id: new ObjectId(childId) });
			let parentNode = await nodesCollection.findOne({
				_id: new ObjectId(parentId)
			});
			if (parentNode) {
				let children = parentNode.children;
				children.splice(children.indexOf(childId), 1);
				parentNode.children = children;
				await nodesCollection.replaceOne(
					{ _id: new ObjectId(parentId) },
					parentNode
				);
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
