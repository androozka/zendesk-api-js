module.exports = ({ instance, headers }) => ({
  sunshine: require('./sunshine')({ instance, headers }),
  support: require('./support')({ instance, headers })
});
