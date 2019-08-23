const support = require('./support');

module.exports = (url, headers) => ({
  support: support(url, headers)
});
