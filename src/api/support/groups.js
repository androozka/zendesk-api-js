const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _user_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Groups
     *
     * GET /api/v2/groups.json
     * GET /api/v2/users/{user_id}/groups.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#list-groups
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2${user_id ? `/users/${user_id}` : ''}/groups.json`,
        headers
      };
    },

    /**
     * Show assignable groups
     *
     * GET /api/v2/groups/assignable.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#show-assignable-groups
     */
    show_assignable: () => {
      // Ignore options
      return {
        method: 'GET',
        url: `${url}/api/v2/groups/assignable.json`,
        headers
      };
    },

    /**
     * Show Group
     *
     * GET /api/v2/groups/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#show-group
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/groups/${id}.json`,
        headers
      };
    },

    /**
     * Create Group
     *
     * POST /api/v2/groups.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#create-group
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/groups.json`,
        headers,
        data
      };
    },

    /**
     * Update Group
     *
     * PUT /api/v2/groups/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#update-group
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
        url: `${url}/api/v2/groups/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Group
     *
     * DELETE /api/v2/groups/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/groups#delete-group
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/groups/${id}.json`,
        headers
      };
    }
  };
};
