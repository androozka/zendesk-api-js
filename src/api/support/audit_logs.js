const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _params = Joi.string().min(1);
const _id = Joi.number().positive();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * Listing Audit Logs
     *
     * GET /api/v2/audit_logs.json
     * https://developer.zendesk.com/rest_api/docs/support/audit_logs#listing-audit-logs
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/audit_logs.json${params ? `?${params}` : ''}`,
        headers
      };
    },

    /**
     * Getting Audit Logs
     *
     * GET /api/v2/audit_logs/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/audit_logs#getting-audit-logs
     */
    get: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/audit_logs/${id}.json`,
        headers
      };
    }
  };
};
