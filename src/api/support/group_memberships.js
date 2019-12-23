const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _user_id = Joi.number().min(1);
const _group_id = Joi.number().min(1);
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
     * GET /api/v2/group_memberships.json
     * GET /api/v2/users/{user_id}/group_memberships.json
     * GET /api/v2/groups/{group_id}/memberships.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#list-memberships
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id,
        group_id: _group_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, group_id } = options;
      if (user_id && group_id)
        throw new Error('either "user_id" or "group_id" may be set, not both');

      return {
        method: 'GET',
        url: `${url}/api/v2/${
          user_id
            ? `users/${user_id}/group_memberships.json`
            : group_id
            ? `groups/${group_id}/memberships.json`
            : `group_memberships.json`
        }`,
        headers
      };
    },

    /**
     * List Assignable Memberships
     *
     * GET /api/v2/group_memberships/assignable.json
     * GET /api/v2/groups/{group_id}/memberships/assignable.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#list-assignable-memberships
     */
    assignable: (options = {}) => {
      const { error } = Joi.object({
        group_id: _group_id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { group_id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/${
          group_id
            ? `groups/${group_id}/memberships/assignable.json`
            : `group_memberships/assignable.json`
        }`,
        headers
      };
    },

    /**
     * Show Membership
     *
     * GET /api/v2/group_memberships/{id}.json
     * GET /api/v2/users/{user_id}/group_memberships/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#show-membership
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
        }/group_memberships/${id}.json`,
        headers
      };
    },

    /**
     * Create Membership
     *
     * POST /api/v2/group_memberships.json
     * POST /api/v2/users/{user_id}/group_memberships.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#create-membership
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
        }/group_memberships.json`,
        headers,
        data
      };
    },

    /**
     * Bulk Create Memberships
     *
     * POST /api/v2/group_memberships/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#bulk-create-memberships
     */
    create_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/group_memberships/create_many.json`,
        headers,
        data
      };
    },

    /**
     * Delete Membership
     *
     * DELETE /api/v2/group_memberships/{id}.json
     * DELETE /api/v2/users/{user_id}/group_memberships/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#delete-membership
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
        }/group_memberships/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Memberships
     *
     * DELETE /api/v2/group_memberships/destroy_many.json?ids={group_membership_ids}
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#bulk-delete-memberships
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/group_memberships/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Set Membership as Default
     *
     * PUT /api/v2/users/{user_id}/group_memberships/{membership_id}/make_default.json
     * https://developer.zendesk.com/rest_api/docs/support/group_memberships#set-membership-as-default
     */
    default: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        membership_id: _membership_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, membership_id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/group_memberships/${membership_id}/make_default.json`,
        headers
      };
    }
  };
};
