const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(1);
const _user_id = Joi.number().min(1);
const _organization_id = Joi.number().min(1);
const _membership_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Memberships
     *
     * GET /api/v2/organization_memberships.json
     * GET /api/v2/users/{user_id}/organization_memberships.json
     * GET /api/v2/organizations/{organization_id}/organization_memberships.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#list-memberships
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id,
        organization_id: _organization_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, organization_id } = options;
      if (user_id && organization_id)
        throw new Error(
          'either "user_id" or "organization_id" may be set, not both'
        );

      return {
        method: 'GET',
        url: `${url}/api/v2/${
          user_id
            ? `users/${user_id}/organization_memberships.json`
            : organization_id
            ? `organizations/${organization_id}/organization_memberships.json`
            : `organization_memberships.json`
        }`,
        headers
      };
    },

    /**
     * Show Membership
     *
     * GET /api/v2/organization_memberships/{id}.json
     * GET /api/v2/users/{user_id}/organization_memberships/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#show-membership
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        user_id: _user_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = '' } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/organization_memberships/${id}.json`,
        headers
      };
    },

    /**
     * Create Membership
     *
     * POST /api/v2/organization_memberships.json
     * POST /api/v2/users/{user_id}/organization_memberships.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#create-membership
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id = '', data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/organization_memberships.json`,
        headers,
        data
      };
    },

    /**
     * Create Many Memberships
     *
     * POST /api/v2/organization_memberships/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#create-many-memberships
     */
    create_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organization_memberships/create_many.json`,
        headers,
        data
      };
    },

    /**
     * Delete Membership
     *
     * DELETE /api/v2/organization_memberships/{id}.json
     * DELETE /api/v2/users/{user_id}/organization_memberships/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#delete-membership
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        user_id: _user_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, user_id = '' } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2${
          user_id ? `/users/${user_id}` : ''
        }/organization_memberships/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Memberships
     *
     * DELETE /api/v2/organization_memberships/destroy_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#bulk-delete-memberships
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organization_memberships/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Set Membership as Default
     *
     * PUT /api/v2/users/{id}/organization_memberships/{membership_id}/make_default.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_memberships#set-membership-as-default
     */
    default: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        membership_id: _membership_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, membership_id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${id}/organization_memberships/${membership_id}/make_default.json`,
        headers
      };
    }
  };
};
