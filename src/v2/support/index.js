const tags = require('./tags');

const support = (url, headers) => ({
  tags: tags(url, headers)
});

module.exports = support;
