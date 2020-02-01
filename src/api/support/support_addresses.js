const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().positive();
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Support Addresses
     *
     * GET /api/v2/recipient_addresses.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#list-support-addresses
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/recipient_addresses.json`,
        headers
      };
    },

    /**
     * Show Support Address
     *
     * GET /api/v2/recipient_addresses/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#show-support-address
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/recipient_addresses/${id}.json`,
        headers
      };
    },

    /**
     * Create Support Address
     *
     * POST /api/v2/recipient_addresses.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#create-support-address
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/recipient_addresses.json`,
        headers,
        data
      };
    },

    /**
     * Update Support Address
     *
     * PUT /api/v2/recipient_addresses/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#update-support-address
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
        url: `${url}/api/v2/recipient_addresses/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Verify Support Address Forwarding
     *
     * PUT /api/v2/recipient_addresses/{id}/verify.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#verify-support-address-forwarding
     */
    verify: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/recipient_addresses/${id}/verify.json`,
        headers
      };
    },

    /**
     * Delete Recipient Address
     *
     * DELETE /api/v2/recipient_addresses/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/support_addresses#delete-recipient-address
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/recipient_addresses/${id}.json`,
        headers
      };
    }
  };
};
