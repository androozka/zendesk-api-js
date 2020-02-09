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
     * List Targets
     *
     * GET /api/v2/targets.json
     * https://developer.zendesk.com/rest_api/docs/support/targets#list-targets
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/targets.json`,
        headers
      };
    },

    /**
     * Show Target
     *
     * GET /api/v2/targets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/targets#show-target
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/targets/${id}.json`,
        headers
      };
    },

    /**
     * Create Target
     *
     * POST /api/v2/targets.json
     * https://developer.zendesk.com/rest_api/docs/support/targets#create-target
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/targets.json`,
        headers,
        data
      };
    },

    /**
     * Update Target
     *
     * PUT /api/v2/targets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/targets#update-target
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
        url: `${url}/api/v2/targets/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Target
     *
     * DELETE /api/v2/targets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/targets#delete-target
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/targets/${id}.json`,
        headers
      };
    }
  };
};
