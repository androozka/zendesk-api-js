const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _user_id = Joi.number().min(1);
const _end_users = Joi.boolean();
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Identities
     *
     * GET /api/v2/users/{user_id}/identities.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#list-identities
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/identities.json`,
        headers
      };
    },

    /**
     * Show Identity
     *
     * GET /api/v2/users/{user_id}/identities/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#show-identity
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id } = options;

      return {
        method: 'GET',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers
      };
    },

    /**
     * Create Identity
     *
     * POST /api/v2/users/{user_id}/identities.json
     * POST /api/v2/end_users/{user_id}/identities.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#create-identity
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        end_users: _end_users,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, end_users = false, data } = options;

      return {
        method: 'POST',
        url: end_users
          ? `${url}/api/v2/end_users/${user_id}/identities.json`
          : `${url}/api/v2/users/${user_id}/identities.json`,
        headers,
        data
      };
    },

    /**
     * Update Identity
     *
     * PUT /api/v2/users/{user_id}/identities/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#update-identity
     */
    update: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Make Identity Primary
     *
     * PUT /api/v2/users/{user_id}/identities/{id}/make_primary
     * PUT /api/v2/end_users/{user_id}/identities/{id}/make_primary
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#make-identity-primary
     */
    make_primary: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required(),
        end_users: _end_users,
        data: _data
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, end_users = false, data = {} } = options;

      return {
        method: 'PUT',
        url: end_users
          ? `${url}/api/v2/end_users/${user_id}/identities/${id}/make_primary`
          : `${url}/api/v2/users/${user_id}/identities/${id}/make_primary`,
        headers,
        data
      };
    },

    /**
     * Verify Identity
     *
     * PUT /api/v2/users/{user_id}/identities/{id}/verify
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#verify-identity
     */
    verify: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required(),
        data: _data
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data = {} } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}/verify`,
        headers,
        data
      };
    },

    /**
     * Request User Verification
     *
     * PUT /api/v2/users/{user_id}/identities/{id}/request_verification.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#request-user-verification
     */
    request_verification: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required(),
        data: _data
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id, data = {} } = options;

      return {
        method: 'PUT',
        url: `${url}/api/v2/users/${user_id}/identities/${id}/request_verification.json`,
        headers,
        data
      };
    },

    /**
     * Delete Identity
     *
     * DELETE /api/v2/users/{user_id}/identities/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/user_identities#delete-identity
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        user_id: _user_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { user_id, id } = options;

      return {
        method: 'DELETE',
        url: `${url}/api/v2/users/${user_id}/identities/${id}.json`,
        headers
      };
    }
  };
};
