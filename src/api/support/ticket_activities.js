const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _activity_id = Joi.number().min(1);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Activities
     *
     * GET /api/v2/activities.json
     * https://developer.zendesk.com/rest_api/docs/support/activity_stream#list-activities
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/activities.json`,
        headers
      };
    },

    /**
     * Show Activity
     *
     * GET /api/v2/activities/{activity_id}.json
     * https://developer.zendesk.com/rest_api/docs/support/activity_stream#show-activity
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        activity_id: _activity_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { activity_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/activities/${activity_id}.json`,
        headers
      };
    }
  };
};
