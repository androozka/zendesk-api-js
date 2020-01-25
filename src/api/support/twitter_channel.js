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
     * Listing Monitored Twitter Handles
     *
     * GET /api/v2/channels/twitter/monitored_twitter_handles.json
     * https://developer.zendesk.com/rest_api/docs/support/twitter_channel#listing-monitored-twitter-handles
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/channels/twitter/monitored_twitter_handles.json`,
        headers
      };
    },

    /**
     * Getting Monitored Twitter Handle
     *
     * GET /api/v2/channels/twitter/monitored_twitter_handles/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/twitter_channel#getting-monitored-twitter-handle
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/channels/twitter/monitored_twitter_handles/${id}.json`,
        headers
      };
    },

    /**
     * Create Ticket from Tweet
     *
     * POST /api/v2/channels/twitter/tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/twitter_channel#create-ticket-from-tweet
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/channels/twitter/tickets.json`,
        headers,
        data
      };
    },

    /**
     * Getting Twicket status
     *
     * GET /api/v2/channels/twitter/tickets/{id}/statuses.json
     * https://developer.zendesk.com/rest_api/docs/support/twitter_channel#getting-twicket-status
     */
    status: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/channels/twitter/tickets/${id}/statuses.json`,
        headers
      };
    }
  };
};
