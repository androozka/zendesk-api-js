module.exports = ({ instance, headers }) => ({
  groups: require('./groups')({ instance, headers }),
  organizations: require('./organizations')({ instance, headers }),
  search: require('./search')({ instance, headers }),
  tags: require('./tags')({ instance, headers }),
  ticket_comments: require('./ticket_comments')({ instance, headers }),
  ticket_fields: require('./ticket_fields')({ instance, headers }),
  ticket_forms: require('./ticket_forms')({ instance, headers }),
  ticket_metrics: require('./ticket_metrics')({ instance, headers }),
  tickets: require('./tickets')({ instance, headers }),
  users: require('./users')({ instance, headers })
});
