const fs = require('fs');
const path = require('path');
const { validate } = require('./utils/options');
const load = require('./utils/load');

// Read folders to list APIs ('/src/api/*')
const APIs = fs.readdirSync(path.resolve(__dirname, 'api'));

// Load each API (support, sunshine, ...)
const zdAPIs = {};
APIs.forEach(api => (zdAPIs[api] = load(api)));

// Initialize each API
const init = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const initialized = {};
  zdAPIs.forEach(api => (initialized[api] = zdAPIs[api].init(options)));

  return initialized;
};

module.exports = { init, ...zdAPIs };
