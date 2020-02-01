const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _params = Joi.string().min(1);
const _id = Joi.number().positive();
const _ids = Joi.string().min(3);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Workspaces
     *
     * GET /api/v2/workspaces.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#list-workspaces
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params = '' } = options;
      const paramStr = params ? `?${params}` : '';
      return {
        method: 'GET',
        url: `${url}/api/v2/workspaces.json${paramStr}`,
        headers
      };
    },

    /**
     * Show Workspace
     *
     * GET /api/v2/workspaces/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#show-workspace
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/workspaces/${id}.json`,
        headers
      };
    },

    /**
     * Create Workspace
     *
     * POST /api/v2/workspaces.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#create-workspace
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/workspaces.json`,
        headers,
        data
      };
    },

    /**
     * Update Workspace
     *
     * PUT /api/v2/workspaces/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#update-workspace
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
        url: `${url}/api/v2/workspaces/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Workspace
     *
     * DELETE /api/v2/workspaces/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#delete-workspace
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/workspaces/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Workspaces
     *
     * DELETE /api/v2/workspaces/destroy_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#bulk-delete-workspaces
     */
    delete_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/workspaces/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Reorder Workspaces
     *
     * PUT /api/v2/workspaces/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/workspaces#reorder-workspaces
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/workspaces/reorder.json`,
        headers,
        data
      };
    }
  };
};
