const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _params = Joi.string().min(1);
const _id = Joi.number().positive();
const _ticket_id = Joi.number().positive();
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Satisfaction Ratings
     *
     * GET /api/v2/satisfaction_ratings.json
     * https://developer.zendesk.com/rest_api/docs/support/satisfaction_ratings#list-satisfaction-ratings
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params } = options;
      const paramStr = params ? `?${params}` : '';
      return {
        method: 'GET',
        url: `${url}/api/v2/satisfaction_ratings.json${paramStr}`,
        headers
      };
    },

    /**
     * Show Satisfaction Rating
     *
     * GET /api/v2/satisfaction_ratings/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/satisfaction_ratings#show-satisfaction-rating
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/satisfaction_ratings/${id}.json`,
        headers
      };
    },

    /**
     * Create a Satisfaction Rating
     *
     * POST /api/v2/tickets/{ticket_id}/satisfaction_rating.json
     * https://developer.zendesk.com/rest_api/docs/support/satisfaction_ratings#create-a-satisfaction-rating
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/${ticket_id}/satisfaction_rating.json`,
        headers,
        data
      };
    }
  };
};
