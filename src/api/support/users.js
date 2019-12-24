const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _type = Joi.string().valid('', 'groups', 'organizations');
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _external_id = Joi.string().min(1);
const _external_ids = Joi.string().min(1);
const _query = Joi.string().min(3);
const _name = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Users
     *
     * GET /api/v2/users.json
     * GET /api/v2/groups/{id}/users.json
     * GET /api/v2/organizations/{id}/users.json
     * https://developer.zendesk.com/rest_api/docs/support/users#list-users
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        type: _type,
        id: _id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type = '', id = 0 } = options;
      if (!type && id > 0)
        throw new Error('if "id" is set, "type" must be set');
      if (type && !id) throw new Error('if "type" is set, "id" must be set');

      return {
        method: 'GET',
        url: {
          '': `${url}/api/v2/users.json`,
          groups: `${url}/api/v2/groups/${id}/users.json`,
          organizations: `${url}/api/v2/organizations/${id}/users.json`
        }[type],
        headers
      };
    },

    /**
     * Show User
     *
     * GET /api/v2/users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/users#show-user
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/${id}.json`,
        headers
      };
    },

    /**
     * Show Many Users
     *
     * GET /api/v2/users/show_many.json?ids={ids}
     * GET /api/v2/users/show_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/users#show-many-users
     */
    show_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '' } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error('either "ids" or "external_ids" can be set, not both');

      return {
        method: 'GET',
        url: `${url}/api/v2/users/show_many.json${
          ids ? `?ids=${ids}` : `?external_ids=${external_ids}`
        }`,
        headers
      };
    },

    /**
     * User related information
     *
     * GET /api/v2/users/{id}/related.json
     * https://developer.zendesk.com/rest_api/docs/support/users#user-related-information
     */
    related: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/${id}/related.json`,
        headers
      };
    },

    /**
     * Create User
     *
     * POST /api/v2/users.json
     * https://developer.zendesk.com/rest_api/docs/support/users#create-user
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users.json`,
        headers,
        data
      };
    },

    /**
     * Create Or Update User
     *
     * POST /api/v2/users/create_or_update.json
     * https://developer.zendesk.com/rest_api/docs/support/users#create-or-update-user
     */
    create_or_update: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update.json`,
        headers,
        data
      };
    },

    /**
     * Create Or Update Many Users
     *
     * POST /api/v2/users/create_or_update_many.json
     * https://developer.zendesk.com/rest_api/docs/support/users#create-or-update-many-users
     */
    create_or_update_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update_many.json`,
        headers,
        data
      };
    },

    /**
     * Merge Self With Another User
     *
     * PUT /api/v2/users/me/merge.json
     * https://developer.zendesk.com/rest_api/docs/support/users#merge-self-with-another-user
     */
    merge_self: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/me/merge.json`,
        headers,
        data
      };
    },

    /**
     * Merge End Users
     *
     * PUT /api/v2/users/{id}/merge.json
     * https://developer.zendesk.com/rest_api/docs/support/users#merge-end-users
     */
    merge: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/${id}/merge.json`,
        headers,
        data
      };
    },

    /**
     * Create Many Users
     *
     * POST /api/v2/users/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/users#create-many-users
     */
    create_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/create_many.json`,
        headers,
        data
      };
    },

    /**
     * Update User
     *
     * PUT /api/v2/users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/users#update-user
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
        url: `${url}/api/v2/users/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Update Many Users
     *
     * PUT /api/v2/users/update_many.json
     * PUT /api/v2/users/update_many.json?ids={ids}
     * PUT /api/v2/users/update_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/users#update-many-users
     */
    update_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '', data } = options;
      if (ids && external_ids)
        throw new Error('both "ids" and "external_ids" cannot be set');

      let params = ids
        ? `?ids=${ids}`
        : external_ids
        ? `?external_ids=${external_ids}`
        : '';

      return {
        method: 'PUT',
        url: `${url}/api/v2/users.json${params}`,
        headers,
        data
      };
    },

    /**
     * Bulk Deleting Users
     *
     * DELETE /api/v2/users/destroy_many.json?ids={ids}
     * DELETE /api/v2/users/destroy_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/users#bulk-deleting-users
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '' } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "ids" or "external_ids" must be set, but not both'
        );

      let params = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json${params}`,
        headers
      };
    },

    /**
     * Delete User
     *
     * DELETE /api/v2/users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/users#delete-user
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/${id}.json`,
        headers
      };
    },

    /**
     * Search Users
     *
     * GET /api/v2/users/search.json?query={query}
     * GET /api/v2/users/search.json?external_id={external_id}
     * https://developer.zendesk.com/rest_api/docs/support/users#search-users
     */
    search: (options = {}) => {
      const { error } = Joi.object({
        query: _query,
        external_id: _external_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { query = '', external_id = '' } = options;
      if ((!query && !external_id) || (query && external_id))
        throw new Error(
          'either "query" or "external_id" must be set, but not both'
        );

      const params = query ? `?query=${query}` : `?external_id=${external_id}`;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/search.json${params}`,
        headers
      };
    },

    /**
     * Autocomplete Users
     *
     * GET /api/v2/users/autocomplete.json?name={name}
     * https://developer.zendesk.com/rest_api/docs/support/users#autocomplete-users
     */
    autocomplete: (options = {}) => {
      const { error } = Joi.object({
        name: _name.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/autocomplete.json?name=${name}`,
        headers
      };
    },

    /**
     * Request User Create
     *
     * POST /api/v2/users/request_create.json
     * https://developer.zendesk.com/rest_api/docs/support/users#request-user-create
     */
    request_create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/users/request_create.json`,
        headers,
        data
      };
    },

    /**
     * List Deleted Users
     *
     * GET /api/v2/deleted_users.json
     * https://developer.zendesk.com/rest_api/docs/support/users#list-deleted-users
     */
    list_deleted: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_users.json`,
        headers
      };
    },

    /**
     * Show Deleted User
     *
     * GET /api/v2/deleted_users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/users#show-deleted-user
     */
    show_deleted: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_users/${id}.json`,
        headers
      };
    },

    /**
     * Permanently Delete User
     *
     * DELETE /api/v2/deleted_users/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/users#permanently-delete-user
     */
    permanently_delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_users/${id}.json`,
        headers
      };
    },

    /**
     * Show Compliance Deletion Statuses
     *
     * GET /api/v2/users/{id}/compliance_deletion_statuses.json
     * https://developer.zendesk.com/rest_api/docs/support/users#show-compliance-deletion-statuses
     */
    compliance_deletion_statuses: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/users/${id}/compliance_deletion_statuses.json`,
        headers
      };
    },

    /**
     * Show the Current User
     *
     * GET /api/v2/users/me.json
     * https://developer.zendesk.com/rest_api/docs/support/users#show-the-current-user
     */
    current: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/users/me.json`,
        headers
      };
    }
  };
};
