module.exports = ({ instance, headers }) => ({
  search: require('./routes/support/search')({ instance, headers }),
  tickets: require('./routes/support/tickets')({ instance, headers }),
  ticket_metrics: require('./routes/support/ticketMetrics')({
    instance,
    headers
  }),
  tags: require('./routes/support/tags')({ instance, headers })
});
