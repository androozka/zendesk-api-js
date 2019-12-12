module.exports = ({ instance, headers }) => ({
  object_types: require('./object_types')({ instance, headers })
});
