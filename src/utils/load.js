const fs = require('fs');
const path = require('path');
const { validate } = require('./options');

module.exports = folder => {
  // Read folder to list endpoints of API ('/src/api/{folder}/*')
  const endpoints = fs
    .readdirSync(path.resolve(__dirname, '../api', folder))
    .map(i => i.slice(0, -3));

  // Load each endpoint file
  const api = {};
  endpoints.forEach(endpoint => {
    api[endpoint] = require(path.resolve('../', folder, endpoint));
  });

  // Initialize each endpoint
  const init = (options = {}) => {
    const { error } = validate(options);
    if (error) throw new Error(error.details[0].message);

    const initialized = {};
    endpoints.forEach(endpoint => {
      initialized[endpoint] = api[endpoint](options);
    });

    return initialized;
  };

  return { init, ...api };
};
