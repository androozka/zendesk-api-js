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
     * List Locations
     *
     * GET /api/v2/apps/locations.json
     * https://developer.zendesk.com/rest_api/docs/support/app_locations#list-locations
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/apps/locations.json`,
        headers
      };
    },

    /**
     * Show Location
     *
     * GET /api/v2/apps/locations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/app_locations#show-location
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/apps/locations/${id}.json`,
        headers
      };
    }
  };
};
