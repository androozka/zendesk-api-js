const support = require('./support');

module.exports = (instance, headers) => ({
  support: support(instance, headers)
});
