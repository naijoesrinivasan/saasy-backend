const express = require("express");
const app = express();
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;
const assert = require("assert");
const indexRoutes = require("./routes/index.routes.js");
const treeRoutes = require("./routes/tree.routes.js");
const debugRoutes = require("./routes/debug.routes.js");
const Constants = require("./constants.js");

const dbType = process.argv[2];

const port = 3000;

const mongoClient = new MongoClient(new MongoServer("localhost", 27017), {
	useNewUrlParser: true
});

mongoClient.connect((err, mongoClient) => {
	assert.equal(null, err);
});

if (dbType === "p") {
	app.locals.db = mongoClient.db(Constants.productionDatabase);
} else {
	app.locals.db = mongoClient.db(Constants.stagingDatabase);
}

app.use(cors());
app.use(express.json());
app.use("", indexRoutes);
app.use("/project", treeRoutes);
app.use("/debug", debugRoutes);

app.listen(port, () => {
	console.log("Server active at port 3000");
});
