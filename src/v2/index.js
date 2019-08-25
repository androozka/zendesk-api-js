module.exports = (instance, headers) => ({
  support: require('./api/support')(instance, headers)
});
