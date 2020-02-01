const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _unix_time = Joi.number().positive();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List ticket metric events
     *
     * GET /api/v2/incremental/ticket_metric_events.json?start_time={unix_time}
     * https://developer.zendesk.com/rest_api/docs/support/ticket_metric_events#list-ticket-metric-events
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        unix_time: _unix_time.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { unix_time } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/incremental/ticket_metric_events.json?start_time=${unix_time}`,
        headers
      };
    }
  };
};
