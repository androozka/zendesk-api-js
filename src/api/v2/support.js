module.exports = ({ instance, headers }) => ({
  groups: require('./routes/support/groups')({ instance, headers }),
  search: require('./routes/support/search')({ instance, headers }),
  tags: require('./routes/support/tags')({ instance, headers }),
  ticket_comments: require('./routes/support/ticketComments')({
    instance,
    headers
  }),
  ticket_fields: require('./routes/support/ticketFields')({
    instance,
    headers
  }),
  ticket_forms: require('./routes/support/ticketForms')({ instance, headers }),
  ticket_metrics: require('./routes/support/ticketMetrics')({
    instance,
    headers
  }),
  tickets: require('./routes/support/tickets')({ instance, headers })
});
