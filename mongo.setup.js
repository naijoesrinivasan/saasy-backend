const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;
const assert = require("assert");
const Constants = require("./constants");

const dbType = process.argv[2];

const mongoClient = new MongoClient(new MongoServer("localhost", 27017), {
  useNewUrlParser: true
});

mongoClient.connect((err, mongoClient) => {
  assert.equal(null, err);
  // create all collections on the server
  let database = null;
  if (dbType === "p") {
    database = mongoClient.db(Constants.productionDatabase);
  } else {
    database = mongoClient.db(Constants.stagingDatabase);
  }
  let collections = [];
  database
    .listCollections()
    .toArray()
    .then(res => (collections = res))
    .catch(err => console.err(err));
  const newCollections = Constants.collections;
  for (collection in newCollections) {
    if (collections.indexOf(collection) === -1) {
      // collection not present, create new
      database.createCollection(collection, (err, res) => {
        if (err) {
          console.err("Failed to create collection " + collection);
          console.err(err);
        }
      });
    }
  }
  console.log("MongoDB initialised");
  process.exit(0);
});
