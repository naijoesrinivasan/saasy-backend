const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;
const assert = require("assert");
const routes = require("./routes/index.routes.js");
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

app.use(express.json());
app.use("", routes);

app.listen(port, () => {
	console.log("Server active at port 3000");
});
