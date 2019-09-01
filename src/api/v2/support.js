module.exports = ({ instance, headers }) => ({
  groups: require('./routes/support/groups')({ instance, headers }),
  search: require('./routes/support/search')({ instance, headers }),
  tags: require('./routes/support/tags')({ instance, headers }),
  tickets: require('./routes/support/tickets')({ instance, headers }),
  ticket_metrics: require('./routes/support/ticketMetrics')({
    instance,
    headers
  })
});
