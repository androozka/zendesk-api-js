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
     * List Sharing Agreements
     *
     * GET /api/v2/sharing_agreements.json
     * https://developer.zendesk.com/rest_api/docs/support/sharing_agreements#list-sharing-agreements
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/sharing_agreements.json`,
        headers
      };
    },

    /**
     * Show a Sharing Agreement
     *
     * GET /api/v2/sharing_agreements/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/sharing_agreements#show-a-sharing-agreement
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/sharing_agreements/${id}.json`,
        headers
      };
    },

    /**
     * Create Sharing Agreement
     *
     * POST /api/v2/sharing_agreements.json
     * https://developer.zendesk.com/rest_api/docs/support/sharing_agreements#create-sharing-agreement
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/sharing_agreements.json`,
        headers,
        data
      };
    },

    /**
     * Update a Sharing Agreement
     *
     * PUT /api/v2/sharing_agreements/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/sharing_agreements#update-a-sharing-agreement
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
        url: `${url}/api/v2/sharing_agreements/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete a Sharing Agreement
     *
     * DELETE /api/v2/sharing_agreements/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/sharing_agreements#delete-a-sharing-agreement
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/sharing_agreements/${id}.json`,
        headers
      };
    }
  };
};
