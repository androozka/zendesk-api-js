module.exports = ({ instance, headers }) => ({
  support: require('./api/v2/support')({ instance, headers })
});
