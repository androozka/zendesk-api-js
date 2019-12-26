const fs = require('fs');
const path = require('path');

const actions = {};
const files = fs
  .readdirSync(__dirname)
  .filter(i => !['index.js'].includes(i))
  .map(i => i.slice(0, -3));
files.forEach(file => (actions[file] = require(path.resolve(__dirname, file))));

module.exports = actions;
