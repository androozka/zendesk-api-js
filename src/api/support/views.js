const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _query = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Views
     *
     * GET /api/v2/views.json
     * https://developer.zendesk.com/rest_api/docs/support/views#list-views
     *
     * List Views by ID
     *
     * GET /api/v2/views/show_many.json?ids=1,2,3
     * https://developer.zendesk.com/rest_api/docs/support/views#list-views-by-id
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '' } = options;
      const params = ids ? `?ids=${ids}` : '';

      return {
        method: 'GET',
        url: `${url}/api/v2/views.json${params}`,
        headers
      };
    },

    /**
     * Update Many Views
     *
     * PUT /api/v2/views/update_many.json
     * https://developer.zendesk.com/rest_api/docs/support/views#update-many-views
     */
    update_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/views/update_many.json`,
        headers,
        data
      };
    },

    /**
     * List Active Views
     *
     * GET /api/v2/views/active.json
     * https://developer.zendesk.com/rest_api/docs/support/views#list-active-views
     */
    active: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/views/active.json`,
        headers
      };
    },

    /**
     * List Views - Compact
     *
     * GET /api/v2/views/compact.json
     * https://developer.zendesk.com/rest_api/docs/support/views#list-views---compact
     */
    compact: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/views/compact.json`,
        headers
      };
    },

    /**
     * Show View
     *
     * GET /api/v2/views/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/views#show-view
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}.json`,
        headers
      };
    },

    /**
     * Create View
     *
     * POST /api/v2/views.json
     * https://developer.zendesk.com/rest_api/docs/support/views#create-view
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views.json`,
        headers,
        data
      };
    },

    /**
     * Update View
     *
     * PUT /api/v2/views/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/views#update-view
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
        url: `${url}/api/v2/views/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete View
     *
     * DELETE /api/v2/views/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/views#delete-view
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/views/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Views
     *
     * DELETE /api/v2/views/destroy_many.json
     * https://developer.zendesk.com/rest_api/docs/support/views#bulk-delete-views
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/views/destroy_many.json`,
        headers,
        data
      };
    },

    /**
     * Execute View
     *
     * GET /api/v2/views/{id}/execute.json
     * https://developer.zendesk.com/rest_api/docs/support/views#execute-view
     */
    execute: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/execute.json`,
        headers
      };
    },

    /**
     * List Tickets from a View
     *
     * GET /api/v2/views/{id}/tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/views#list-tickets-from-a-view
     */
    tickets: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/tickets.json`,
        headers
      };
    },

    /**
     * Get View Counts
     *
     * GET /api/v2/views/count_many.json?ids={view_id},{view_id}
     * https://developer.zendesk.com/rest_api/docs/support/views#get-view-counts
     */
    count_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/count_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Get View Count
     *
     * GET /api/v2/views/{id}/count.json
     * https://developer.zendesk.com/rest_api/docs/support/views#get-view-count
     */
    count: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/count.json`,
        headers
      };
    },

    /**
     * Export View
     *
     * GET /api/v2/views/{id}/export.json
     * https://developer.zendesk.com/rest_api/docs/support/views#export-view
     */
    export: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/${id}/export.json`,
        headers
      };
    },

    /**
     * Search Views
     *
     * GET /api/v2/views/search.json
     * https://developer.zendesk.com/rest_api/docs/support/views#search-views
     */
    search: (options = {}) => {
      const { error } = Joi.object({
        query: _query.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { query } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/views/search.json?query=${query}`,
        headers
      };
    },

    /**
     * Previewing Views
     *
     * POST /api/v2/views/preview.json
     * https://developer.zendesk.com/rest_api/docs/support/views#previewing-views
     */
    preview: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views/preview.json`,
        headers,
        data
      };
    },

    /**
     * Preview Count
     *
     * POST /api/v2/views/preview/count.json
     * https://developer.zendesk.com/rest_api/docs/support/views#preview-count
     */
    preview_count: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/views/preview/count.json`,
        headers,
        data
      };
    }
  };
};
