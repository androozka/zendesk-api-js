const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _user_id = Joi.number().min(1);
const _organization_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Organization Subscriptions
     *
     * GET /api/v2/organizations/{organization_id}/subscriptions.json
     * GET /api/v2/organization_subscriptions.json
     * GET /api/v2/users/{user_id}/organization_subscriptions.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_subscriptions#list-organization-subscriptions
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
            ? `users/${user_id}/organization_subscriptions.json`
            : organization_id
            ? `organizations/${organization_id}/subscriptions.json`
            : `organization_subscriptions.json`
        }`,
        headers
      };
    },

    /**
     * Show Organization Subscription
     *
     * GET /api/v2/organization_subscriptions/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_subscriptions#show-organization-subscription
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organization_subscriptions/${id}.json`,
        headers
      };
    },

    /**
     * Create Organization Subscription
     *
     * POST /api/v2/organization_subscriptions.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_subscriptions#create-organization-subscription
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organization_subscriptions.json`,
        headers,
        data
      };
    },

    /**
     * Delete Organization Subscription
     *
     * DELETE /api/v2/organization_subscriptions/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_subscriptions#delete-organization-subscription
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organization_subscriptions/${id}.json`,
        headers
      };
    }
  };
};
