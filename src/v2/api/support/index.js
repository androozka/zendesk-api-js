module.exports = (instance, headers) => ({
  search: require('./routes/search')(instance, headers),
  tags: require('./routes/tags')(instance, headers),
  ticket_metrics: require('./routes/ticketMetrics')(instance, headers)
});
