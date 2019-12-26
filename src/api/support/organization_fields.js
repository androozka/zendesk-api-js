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
     * List Organization Fields
     *
     * GET /api/v2/organization_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#list-organization-fields
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/organization_fields.json`,
        headers
      };
    },

    /**
     * Show Organization Field
     *
     * GET /api/v2/organization_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#show-organization-field
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/organization_fields/${id}.json`,
        headers
      };
    },

    /**
     * Create Organization Fields
     *
     * POST /api/v2/organization_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#create-organization-fields
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/organization_fields.json`,
        headers,
        data
      };
    },

    /**
     * Update Organization Fields
     *
     * PUT /api/v2/organization_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#update-organization-fields
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
        url: `${url}/api/v2/organization_fields/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Organization Field
     *
     * DELETE /api/v2/organization_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#delete-organization-field
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/organization_fields/${id}.json`,
        headers
      };
    },

    /**
     * Reorder Organization Field
     *
     * PUT /api/v2/organization_fields/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/organization_fields#reorder-organization-field
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/organization_fields/reorder.json`,
        headers,
        data
      };
    }
  };
};
