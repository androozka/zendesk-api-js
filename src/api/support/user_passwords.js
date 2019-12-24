const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _user_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Set a User's Password
     *
     * POST /api/v2/users/{user_id}/password.json
     * https://developer.zendesk.com/rest_api/docs/support/user_passwords#set-a-users-password
     */
    set: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/${user_id}/password.json`,
        headers,
        data
      };
    },

    /**
     * Change Your Password
     *
     * PUT /api/v2/users/{user_id}/password.json
     * https://developer.zendesk.com/rest_api/docs/support/user_passwords#change-your-password
     */
    change: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/password.json`,
        headers,
        data
      };
    },

    /**
     * Get a list of password requirements
     *
     * GET /api/v2/users/{user_id}/password/requirements.json
     * https://developer.zendesk.com/rest_api/docs/support/user_passwords#get-a-list-of-password-requirements
     */
    requirements: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/password/requirements.json`,
        headers
      };
    }
  };
};
