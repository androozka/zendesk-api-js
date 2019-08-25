module.exports = (instance, headers) => ({
  list: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/ticket_metrics.json`,
    headers
  }),

  show: (type, id) => ({
    method: 'GET',
    url: {
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${id}/metrics.json`,
      ticket_metrics: `https://${instance}.zendesk.com/api/v2/ticket_metrics/${id}.json`
    }[type],
    headers
  })
});
