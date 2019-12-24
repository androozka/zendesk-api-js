const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _data = Joi.object().min(1);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Ticket Import
     *
     * POST /api/v2/imports/tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_import#ticket-import
     */
    single: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/imports/tickets.json`,
        headers,
        data
      };
    },

    /**
     * Ticket Bulk Import
     *
     * POST /api/v2/imports/tickets/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_import#ticket-bulk-import
     */
    bulk: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/imports/tickets/create_many.json`,
        headers,
        data
      };
    }
  };
};
