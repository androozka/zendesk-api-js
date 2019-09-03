const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = null) => {
      if (options) throw new Error('options not allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics.json`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id = 0, ticket_metric_id = 0 } = options;
      if ((!ticket_id && !ticket_metric_id) || (ticket_id && ticket_metric_id))
        throw new Error(
          'either "ticket_id" or "ticket_metric_id" must be set, but not both'
        );

      const part = ticket_id
        ? `tickets/${ticket_id}/metrics.json`
        : `ticket_metrics/${ticket_metric_id}.json`;

      return {
        method: 'GET',
        url: `${url}/api/v2/${part}`,
        headers
      };
    }
  };
};
