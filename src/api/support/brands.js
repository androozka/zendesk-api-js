const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _host_mapping = Joi.string().min(1);
const _subdomain = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Brands
     *
     * GET /api/v2/brands.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#list-brands
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/brands.json`,
        headers
      };
    },

    /**
     * Show a Brand
     *
     * GET /api/v2/brands/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#show-a-brand
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/brands/${id}.json`,
        headers
      };
    },

    /**
     * Create Brand
     *
     * POST /api/v2/brands.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#create-brand
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/brands.json`,
        headers,
        data
      };
    },

    /**
     * Update a Brand
     *
     * PUT /api/v2/brands/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#update-a-brand
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
        url: `${url}/api/v2/brands/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete a Brand
     *
     * DELETE /api/v2/tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#delete-a-brand
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/brands/${id}.json`,
        headers
      };
    },

    /**
     * Check host mapping validity
     *
     * GET /api/v2/brands/check_host_mapping.json?host_mapping={host_mapping}&subdomain={subdomain}
     * https://developer.zendesk.com/rest_api/docs/support/brands#check-host-mapping-validity
     */
    check: (options = {}) => {
      const { error } = Joi.object({
        host_mapping: _host_mapping.required(),
        subdomain: _subdomain.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { host_mapping, subdomain } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/brands/check_host_mapping.json?host_mapping=${host_mapping}&subdomain=${subdomain}`,
        headers
      };
    },

    /**
     * Check host mapping validity for an existing brand
     *
     * GET /api/v2/brands/{id}/check_host_mapping.json
     * https://developer.zendesk.com/rest_api/docs/support/brands#check-host-mapping-validity-for-an-existing-brand
     */
    check_existing: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/brands/${id}/check_host_mapping.json`,
        headers
      };
    }
  };
};
