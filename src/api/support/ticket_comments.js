const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ticket_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Comments
     *
     * GET /api/v2/tickets/{ticket_id}/comments.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_comments#list-comments
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/comments.json`,
        headers
      };
    },

    /**
     * List Email CCs for a Comment
     *
     * GET /api/v2/tickets/{ticket_id}/comments.json?include=users
     * https://developer.zendesk.com/rest_api/docs/support/ticket_comments#list-email-ccs-for-a-comment
     */
    emailCCs: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/comments.json?include=users`,
        headers
      };
    },

    /**
     * Redact String in Comment
     *
     * PUT /api/v2/tickets/{ticket_id}/comments/{id}/redact.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_comments#redact-string-in-comment
     */
    redact: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${ticket_id}/comments/${id}/redact.json`,
        headers,
        data
      };
    },

    /**
     * Make Comment Private
     *
     * PUT /api/v2/tickets/{ticket_id}/comments/{id}/make_private.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_comments#make-comment-private
     */
    makePrivate: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${ticket_id}/comments/${id}/make_private.json`,
        headers,
        data: {}
      };
    }
  };
};
