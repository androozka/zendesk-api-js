const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Show User
     *
     * GET /api/v2/end_users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/end_user#show-user
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/end_users/${id}.json`,
        headers
      };
    },

    /**
     * Update User
     *
     * PUT /api/v2/end_users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/end_user#update-user
     */
    update: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/end_users/${id}.json`,
        headers,
        data
      };
    }
  };
};
