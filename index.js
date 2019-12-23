// array list for each folder in src
const fs = require('fs');
const validate = require('./src/validate');

// Load all APIs
const zdAPIs = {};
const endpoints = fs.readdirSync('./src').filter(i => i !== 'validate.js');
endpoints.forEach(i => (zdAPIs[i] = require(`./src/${i}`)));

const init = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const api = {};
  endpoints.forEach(i => (api[i] = zdAPIs[i].init(options)));

  return api;
};

module.exports = { init, ...zdAPIs };
