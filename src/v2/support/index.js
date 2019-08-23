const tags = require('./tags');

const support = (instance, headers) => ({
  tags: tags(instance, headers)
});

module.exports = support;
