const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _field_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List User Fields
     *
     * GET /api/v2/user_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#list-user-fields
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/user_fields.json`,
        headers
      };
    },

    /**
     * Show User Field
     *
     * GET /api/v2/user_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#show-user-field
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/user_fields/${id}.json`,
        headers
      };
    },

    /**
     * Create User Fields
     *
     * POST /api/v2/user_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#create-user-fields
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/user_fields.json`,
        headers,
        data
      };
    },

    /**
     * Update User Fields
     *
     * PUT /api/v2/user_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#update-user-fields
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
        url: `${url}/api/v2/user_fields/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete User Field
     *
     * DELETE /api/v2/user_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#delete-user-field
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/${id}.json`,
        headers
      };
    },

    /**
     * Reorder User Field
     *
     * PUT /api/v2/user_fields/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#reorder-user-field
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/user_fields/reorder.json`,
        headers,
        data
      };
    },

    /**
     * List User Field Options
     *
     * GET /api/v2/user_fields/{field_id}/options.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#list-user-field-options
     */
    listOptions: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/user_fields/${field_id}/options.json`,
        headers
      };
    },

    /**
     * Show a User Field Option
     *
     * GET /api/v2/user_fields/{field_id}/options/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#show-a-user-field-option
     */
    showOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers
      };
    },

    /**
     * Create or Update a User Field Option
     *
     * POST /api/v2/user_fields/{field_id}/options.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#create-or-update-a-user-field-option
     */
    createOrUpdateOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/user_fields/${field_id}/options.json`,
        headers,
        data
      };
    },

    /**
     * Delete User Field Option
     *
     * DELETE /api/v2/user_fields/{field_id}/options/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_fields#delete-user-field-option
     */
    deleteOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/user_fields/${field_id}/options/${id}.json`,
        headers
      };
    }
  };
};
