const express = require("express");
const app = express();
const routes = require("./routes/index.routes.js");

const port = 3000;

app.use(express.json());
app.use("", routes);

app.listen(3000, () => {
	console.log("Server active at port 3000");
});
