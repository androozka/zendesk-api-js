const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _type = Joi.string().valid('tickets', 'organizations', 'users');
const _id = Joi.number().min(1);
const _name = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Tags
     *
     * GET /api/v2/tags.json
     * https://developer.zendesk.com/rest_api/docs/support/tags#list-tags
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/tags.json`,
        headers
      };
    },

    /**
     * Show Tags
     *
     * GET /api/v2/tickets/{id}/tags.json
     * GET /api/v2/organizations/{id}/tags.json
     * GET /api/v2/users/{id}/tags.json
     * https://developer.zendesk.com/rest_api/docs/support/tags#show-tags
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        type: _type.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers
      };
    },

    /**
     * Set Tags
     *
     * POST /api/v2/tickets/{id}/tags.json
     * POST /api/v2/organizations/{id}/tags.json
     * POST /api/v2/users/{id}/tags.json
     * https://developer.zendesk.com/rest_api/docs/support/tags#set-tags
     */
    set: (options = {}) => {
      const { error } = Joi.object({
        type: _type.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    /**
     * Add Tags
     *
     * PUT /api/v2/tickets/{id}/tags.json
     * PUT /api/v2/organizations/{id}/tags.json
     * PUT /api/v2/users/{id}/tags.json
     * https://developer.zendesk.com/rest_api/docs/support/tags#add-tags
     */
    add: (options = {}) => {
      const { error } = Joi.object({
        type: _type.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    /**
     * Remove Tags
     *
     * DELETE /api/v2/tickets/{id}/tags.json
     * DELETE /api/v2/organizations/{id}/tags.json
     * DELETE /api/v2/users/{id}/tags.json
     * https://developer.zendesk.com/rest_api/docs/support/tags#remove-tags
     */
    remove: (options = {}) => {
      const { error } = Joi.object({
        type: _type.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type, id, data } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/${type}/${id}/tags.json`,
        headers,
        data
      };
    },

    /**
     * Autocomplete Tags
     *
     * GET /api/v2/autocomplete/tags.json?name={name}
     * https://developer.zendesk.com/rest_api/docs/support/tags#autocomplete-tags
     */
    autocomplete: (options = {}) => {
      const { error } = Joi.object({
        name: _name.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/autocomplete/tags.json?name=${name}`,
        headers
      };
    }
  };
};
