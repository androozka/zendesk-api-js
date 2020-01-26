const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _params = Joi.string().min(1);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Incremental Attributes Export
     *
     * GET /api/v2/incremental/routing/attributes.json
     * https://developer.zendesk.com/rest_api/docs/support/incremental_skill_based_routing#incremental-attributes-export
     */
    attributes: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params = '' } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attributes.json${
          params ? `?${params}` : ''
        }`,
        headers
      };
    },

    /**
     * Incremental Attribute Values Export
     *
     * GET /api/v2/incremental/routing/attribute_values.json
     * https://developer.zendesk.com/rest_api/docs/support/incremental_skill_based_routing#incremental-attribute-values-export
     */
    attribute_values: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params = '' } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attribute_values.json${
          params ? `?${params}` : ''
        }`,
        headers
      };
    },

    /**
     * Incremental Instance Values Export
     *
     * GET /api/v2/incremental/routing/instance_values.json
     * https://developer.zendesk.com/rest_api/docs/support/incremental_skill_based_routing#incremental-instance-values-export
     */
    instance_values: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params = '' } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/instance_values.json${
          params ? `?${params}` : ''
        }`,
        headers
      };
    }
  };
};
