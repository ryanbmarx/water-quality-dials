#!/usr/bin/env node
require = require("esm")(module);
require("svelte/register");

const path = require("path");
const fs = require("fs/promises");
const App = require("../src/App.svelte").default;


// Server-side renders the dials in a data-less/loading state
function render(){

}
if (require.main === module) {
   render();
  
  module.exports = {
    render,
  };
  