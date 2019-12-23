const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _data = Joi.object();

module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Custom Roles
     *
     * GET /api/v2/custom_roles.json
     * https://developer.zendesk.com/rest_api/docs/support/custom_roles#list-custom-roles
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/custom_roles.json`,
        headers
      };
    },

    /**
     * Show Custom Role
     *
     * GET /api/v2/custom_roles/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/custom_roles#show-custom-role
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/custom_roles/${id}.json`,
        headers
      };
    },

    /**
     * Create Custom Role
     *
     * POST /api/v2/custom_roles.json
     * https://developer.zendesk.com/rest_api/docs/support/custom_roles#create-custom-role
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/custom_roles.json`,
        headers,
        data
      };
    },

    /**
     * Update Custom Role
     *
     * PUT /api/v2/custom_roles/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/custom_roles#update-custom-role
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
        url: `${url}/api/v2/custom_roles/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Custom Role
     *
     * DELETE /api/v2/custom_roles/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/custom_roles#delete-custom-role
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/custom_roles/${id}.json`,
        headers
      };
    }
  };
};
