const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(1);
const _query = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Automations
     *
     * GET /api/v2/automations.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#list-automations
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/automations.json`,
        headers
      };
    },

    /**
     * Show Automation
     *
     * GET /api/v2/automations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#show-automation
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/automations/${id}.json`,
        headers
      };
    },

    /**
     * List Active Automations
     *
     * GET /api/v2/automations/active.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#list-active-automations
     */
    active: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/automations/active.json`,
        headers
      };
    },

    /**
     * Create Automation
     *
     * POST /api/v2/automations.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#create-automation
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/automations.json`,
        headers,
        data
      };
    },

    /**
     * Update Automation
     *
     * PUT /api/v2/automations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#update-automation
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
        url: `${url}/api/v2/automations/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Update Many Automations
     *
     * PUT /api/v2/automations/update_many.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#update-many-automations
     */
    update_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/automations/update_many.json`,
        headers,
        data
      };
    },

    /**
     * Delete Automation
     *
     * DELETE /api/v2/automations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#delete-automation
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/automations/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Automations
     *
     * DELETE /api/v2/automations/destroy_many.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#bulk-delete-automations
     */
    delete_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/automations/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Search Automations
     *
     * GET /api/v2/automations/search.json
     * https://developer.zendesk.com/rest_api/docs/support/automations#search-automations
     */
    search: (options = {}) => {
      const { error } = Joi.object({
        query: _query.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { query } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/automations/search.json?query=${query}`,
        headers
      };
    }
  };
};
