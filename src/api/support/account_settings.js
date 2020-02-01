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
     * Show Settings
     *
     * GET /api/v2/account/settings.json
     * https://developer.zendesk.com/rest_api/docs/support/account_settings#show-settings
     */
    show: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/account/settings.json`,
        headers
      };
    },

    /**
     * Update Account Settings
     *
     * PUT /api/v2/account/settings.json
     * https://developer.zendesk.com/rest_api/docs/support/account_settings#update-account-settings
     */
    update: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/account/settings.json`,
        headers,
        data
      };
    }
  };
};
