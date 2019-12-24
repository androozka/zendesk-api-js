const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _ticket_id = Joi.number().min(1);
const _ticket_metric_id = Joi.number().min(1);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Ticket Metrics
     *
     * GET /api/v2/ticket_metrics.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_metrics#list-ticket-metrics
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_metrics.json`,
        headers
      };
    },

    /**
     * Show Ticket Metrics
     *
     * GET /api/v2/ticket_metrics/{ticket_metric_id}.json
     * GET /api/v2/tickets/{ticket_id}/metrics.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_metrics#show-ticket-metrics
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id,
        ticket_metric_id: _ticket_metric_id
      }).validate(options);
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
