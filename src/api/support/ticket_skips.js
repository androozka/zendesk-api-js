const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _data = Joi.object();
const _ticket_id = Joi.number().positive();
const _user_id = Joi.number().positive();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Record a new skip for the current user
     *
     * POST /api/v2/skips.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_skips#record-a-new-skip-for-the-current-user
     */
    record: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/skips.json`,
        headers,
        data
      };
    },

    /**
     * List skips for the current account
     *
     * GET /api/v2/skips.json
     * GET /api/v2/tickets/{ticket_id}/skips.json
     * GET /api/v2/users/{user_id}/skips.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_skips#list-skips-for-the-current-account
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id,
        user_id: _user_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id = 0, user_id = 0 } = options;
      const section = ticket_id
        ? `tickets/${ticket_id}/`
        : user_id
        ? `users/${user_id}/`
        : '';

      return {
        method: 'GET',
        url: `${url}/api/v2/${section}skips.json`,
        headers
      };
    }
  };
};
