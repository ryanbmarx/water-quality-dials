#!/usr/bin/env node
require = require("esm")(module);

const path = require("path");
const fs = require("fs/promises");

// Server-side renders the dials in a data-less/loading state
async function update() {
	let log = `++ Updating data at ${new Date()}`;
	console.log(log);
	return fs.writeFile("./data.json", JSON.stringify({ log }));
}
if (require.main === module) {
	update();
}
module.exports = {
	update,
};
