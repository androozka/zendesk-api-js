const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _user_id = Joi.number().min(1);
const _external_id = Joi.number().min(1);
const _external_ids = Joi.string().min(1);
const _name = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Organizations
     *
     * GET /api/v2/organizations.json
     * GET /api/v2/users/{user_id}/organizations.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#list-organizations
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id = '' } = options;
      const part = user_id ? `/users/${user_id}` : '';
      return {
        method: 'GET',
        url: `${url}/api/v2${part}/organizations.json`,
        headers
      };
    },

    /**
     * Autocomplete Organizations
     *
     * GET /api/v2/organizations/autocomplete.json?name={name}
     * https://developer.zendesk.com/rest_api/docs/support/organizations#autocomplete-organizations
     */
    autocomplete: (options = {}) => {
      const { error } = Joi.object({
        name: _name.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/autocomplete.json?name=${name}`,
        headers
      };
    },

    /**
     * Show Organization's Related Information
     *
     * GET /api/v2/organizations/{id}/related.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#show-organizations-related-information
     */
    related: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/${id}/related.json`,
        headers
      };
    },

    /**
     * Show Organization
     *
     * GET /api/v2/organizations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#show-organization
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/${id}.json`,
        headers
      };
    },

    /**
     * Show Many Organizations
     *
     * GET /api/v2/organizations/show_many.json?ids={ids}
     * GET /api/v2/organizations/show_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/organizations#show-many-organizations
     */
    show_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', external_ids = '' } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "user_ids" or "external_ids" must be set, not both'
        );

      const part = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json${part}`,
        headers
      };
    },

    /**
     * Create Organization
     *
     * POST /api/v2/organizations.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#create-organization
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations.json`,
        headers,
        data
      };
    },

    /**
     * Create Many Organizations
     *
     * POST /api/v2/organizations/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#create-many-organizations
     */
    create_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations/create_many.json`,
        headers,
        data
      };
    },

    /**
     * Create Or Update Organization
     *
     * POST /api/v2/organizations/create_or_update.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#create-or-update-organization
     */
    create_or_update: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organizations/create_or_update.json`,
        headers,
        data
      };
    },

    /**
     * Update Organization
     *
     * PUT /api/v2/organizations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#update-organization
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
        url: `${url}/api/v2/organizations/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Update Many Organizations
     *
     * PUT /api/v2/organizations/update_many.json
     * PUT /api/v2/organizations/update_many.json?ids={ids}
     * PUT /api/v2/organizations/update_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/organizations#update-many-organizations
     */
    update_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids, external_ids, data } = options;
      if (ids && external_ids)
        throw new Error('either "ids" or "external_ids" can be set, not both');

      const part = ids
        ? `?ids=${ids}`
        : external_ids
        ? `?external_ids=${external_ids}`
        : '';

      return {
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json${part}`,
        headers,
        data
      };
    },

    /**
     * Delete Organization
     *
     * DELETE /api/v2/organizations/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organizations#delete-organization
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organizations/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Organizations
     *
     * DELETE /api/v2/organizations/destroy_many.json?ids={ids}
     * DELETE /api/v2/organizations/destroy_many.json?external_ids={external_ids}
     * https://developer.zendesk.com/rest_api/docs/support/organizations#bulk-delete-organizations
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        external_ids: _external_ids
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids, external_ids } = options;
      if ((!ids && !external_ids) || (ids && external_ids))
        throw new Error(
          'either "user_ids" or "external_ids" must be set, not both'
        );

      const part = ids ? `?ids=${ids}` : `?external_ids=${external_ids}`;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json${part}`,
        headers
      };
    },

    /**
     * Search Organizations by External ID
     *
     * GET /api/v2/organizations/search.json?external_id={external_id}
     * https://developer.zendesk.com/rest_api/docs/support/organizations#search-organizations-by-external-id
     */
    search: (options = {}) => {
      const { error } = Joi.object({
        external_id: _external_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { external_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organizations/search.json?external_id=${external_id}`,
        headers
      };
    }
  };
};
