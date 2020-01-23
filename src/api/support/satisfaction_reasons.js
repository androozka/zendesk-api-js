const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().positive();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Reasons for Satisfaction Rating
     *
     * GET /api/v2/satisfaction_reasons.json
     * https://developer.zendesk.com/rest_api/docs/support/satisfaction_reasons#list-reasons-for-satisfaction-rating
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/satisfaction_reasons.json`,
        headers
      };
    },

    /**
     * Show Reason for Satisfaction Rating
     *
     * GET /api/v2/satisfaction_reasons/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/satisfaction_reasons#show-reason-for-satisfaction-rating
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/satisfaction_reasons/${id}.json`,
        headers
      };
    }
  };
};
