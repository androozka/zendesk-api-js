module.exports = ({ instance, headers }) => ({
  list: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/ticket_metrics.json`,
    headers
  }),

  show: ({ type = '', ticket_metric_id, ticket_id }) => ({
    method: 'GET',
    url: {
      '': `https://${instance}.zendesk.com/api/v2/ticket_metrics/${ticket_metric_id}.json`,
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${ticket_id}/metrics.json`
    }[type],
    headers
  })
});
