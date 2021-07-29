#!/usr/bin/env node
require = require("esm")(module);
require("svelte/register");

const path = require("path");
const fs = require("fs/promises");
const App = require("../src/App.svelte").default;

const minify = require("html-minifier").minify;

// Server-side renders the dials in a data-less/loading state
async function render() {
	const FILES_WE_WANT = [
		"./functions/dials.template.html",
		"./functions/index.template.html",
		"./functions/settings.json",
	];

	// Fetch these files, waiting until they are all downloaded to proceed.
	const files = await Promise.all(
		FILES_WE_WANT.map(f => {
			console.log("++ Getting %s", f);
			return fs.readFile(f, {
				encoding: "utf-8",
			});
		})
	);
	// Split up our needed files for easy usage.
	const [dialsTemplate, indexTemplate, settings] = files;

	// Render the graphic's HTML
	const { html } = App.render(JSON.parse(settings));

	// Incorporate the graphic and settings to the dials template
	const rendered = dialsTemplate
		.replace("<!-- HTML -->", html)
		.replace("// SETTINGS", settings);

	// Write our rendered graphic to a file, for easy copy/pasting
	fs.writeFile(
		"./public/dials.html",
		minify(rendered, {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
		})
	);

	// Make a simple, stub of an index page using our rendered graphic
	const renderedIndex = indexTemplate.replace("<!-- CONTENT -->", rendered);
	return fs.writeFile("./public/index.html", renderedIndex);
}
if (require.main === module) {
	render();
}
module.exports = {
	render,
};
