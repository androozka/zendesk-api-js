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
     * List Target Failures
     *
     * GET /api/v2/target_failures.json
     * https://developer.zendesk.com/rest_api/docs/support/target_failures#list-target-failures
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/target_failures.json`,
        headers
      };
    },

    /**
     * Show Target Failure
     *
     * GET /api/v2/target_failures/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/target_failures#show-target-failure
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/target_failures/${id}.json`,
        headers
      };
    }
  };
};
