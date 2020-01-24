const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Location Installations
     *
     * GET /api/v2/apps/location_installations.json
     * https://developer.zendesk.com/rest_api/docs/support/app_location_installations#list-location-installations
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/apps/location_installations.json`,
        headers
      };
    },

    /**
     * Reorder App Installations For Location
     *
     * POST /api/v2/apps/location_installations/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/app_location_installations#reorder-app-installations-for-location
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/apps/location_installations/reorder.json`,
        headers,
        data
      };
    }
  };
};
