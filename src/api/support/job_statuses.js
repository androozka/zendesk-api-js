const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().positive();
const _ids = Joi.string().min(3);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Job Statuses
     *
     * GET /api/v2/job_statuses.json
     * https://developer.zendesk.com/rest_api/docs/support/job_statuses#list-job-statuses
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/job_statuses.json`,
        headers
      };
    },

    /**
     * Show Job Status
     *
     * GET /api/v2/job_statuses/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/job_statuses/${id}.json`,
        headers
      };
    },

    /**
     * Show Many Job Statuses
     *
     * GET /api/v2/job_statuses/show_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/job_statuses#show-many-job-statuses
     */
    show_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/job_statuses/show_many.json?ids=${ids}`,
        headers
      };
    }
  };
};
