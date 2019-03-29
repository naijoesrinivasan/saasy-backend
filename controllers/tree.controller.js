const Constants = require("../constants");
const ObjectId = require("mongodb").ObjectId;

class TreeController {
	async traverse(node, data, collection) {
		if (node) {
			data.name = node.key;
			data._id = node._id;
			data.children = [];
			const children = node.children;
			for (const childId in children) {
				const child = await collection.findOne({
					_id: new ObjectId(children[childId])
				});
				data.children.push(await this.traverse(child, {}, collection));
			}
		}
		return data;
	}

	async getTree(projectId, db) {
		const data = {};
		const treesCollection = db.collection(Constants.collections[1]);
		const nodesCollection = db.collection(Constants.collections[2]);
		let root = await treesCollection.findOne({ projectId: projectId });
		root = await nodesCollection.findOne({ _id: new ObjectId(root._id) });
		return await this.traverse(root, {}, nodesCollection);
	}

	async addChild(child, parentId, projectId, db) {
		const nodesCollection = db.collection(Constants.collections[2]);
		let childId = null;
		try {
			child.children = [];
			childId = String(
				(await nodesCollection.insertOne(child)).ops[0]._id
			);
			if (!parentId) {
				// root node, projectId must have been provided
				if (!projectId) {
					return 403;
				}
				const treesCollection = db.collection(Constants.collections[1]);
				child.projectId = projectId;
				delete child.children;
				await treesCollection.insertOne(child);
			} else {
				child.children = [];
				let parentNode = await nodesCollection.findOne({
					_id: new ObjectId(parentId)
				});

				if (parentNode) {
					let children = parentNode.children;
					children.push(childId);
					parentNode.children = children;
					await nodesCollection.replaceOne(
						{ _id: new ObjectId(parentId) },
						parentNode
					);
				}
			}
		} catch (error) {
			console.error(error);
			return error;
		}

		child._id = childId;
		return child;
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

	async editChild(child, db) {
		const nodesCollection = db.collection(Constants.collections[2]);
		child._id = new ObjectId(child._id);
		try {
			await nodesCollection.replaceOne({ _id: child._id }, child);
		} catch (error) {
			console.error(error);
			return 500;
		}
		return 200;
	}

	async getChildByName(childName, db) {
		const nodesCollection = db.collection(Constants.collections[2]);
		let child = null;
		try {
			child = await nodesCollection.findOne({ key: String(childName) });
		} catch (error) {
			console.error(error);
			return error;
		}
		return child;
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
