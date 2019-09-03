module.exports = ({ instance, headers }) => ({
  support: require('./support')({ instance, headers })
});
