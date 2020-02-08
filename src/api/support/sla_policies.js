const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List SLA Policies
     *
     * GET /api/v2/slas/policies
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#list-sla-policies
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/slas/policies`,
        headers
      };
    },

    /**
     * Get SLA Policy
     *
     * GET /api/v2/slas/policies/{id}
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#get-sla-policy
     */
    get: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/slas/policies/${id}`,
        headers
      };
    },

    /**
     * Create SLA Policy
     *
     * POST /api/v2/slas/policies
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#create-sla-policy
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/slas/policies`,
        headers,
        data
      };
    },

    /**
     * Update SLA Policy
     *
     * PUT /api/v2/slas/policies/{id}
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#update-sla-policy
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
        url: `${url}/api/v2/slas/policies/${id}`,
        headers,
        data
      };
    },

    /**
     * Delete SLA Policy
     *
     * DELETE /api/v2/slas/policies/{id}
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#delete-sla-policy
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/slas/policies/${id}`,
        headers
      };
    },

    /**
     * Reorder SLA Policies
     *
     * PUT /api/v2/slas/policies/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#reorder-sla-policies
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/slas/policies/reorder.json`,
        headers,
        data
      };
    },

    /**
     * Retrieve supported filter definition items
     *
     * GET /api/v2/slas/policies/definitions.json
     * https://developer.zendesk.com/rest_api/docs/support/sla_policies#retrieve-supported-filter-definition-items
     */
    definitions: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/slas/policies/definitions.json`,
        headers
      };
    }
  };
};
