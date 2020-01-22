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
     * List All Ticket Audits
     *
     * GET /api/v2/ticket_audits.json
     * GET /api/v2/ticket_audits.json?cursor=fDE1MDE1OTE1MzQuMHx8MTEzMjQ4NDI1MQ%3D%3D
     * https://developer.zendesk.com/rest_api/docs/support/ticket_audits#list-all-ticket-audits
     */
    list_all: (options = {}) => {
      const { error } = Joi.object({
        params: _params
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { params } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_audits.json${params ? `?${params}` : ''}`,
        headers
      };
    },

    /**
     * List Audits for a Ticket
     *
     * GET /api/v2/tickets/{ticket_id}/audits.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_audits#list-audits-for-a-ticket
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/audits.json`,
        headers
      };
    },

    /**
     * Show Audit
     *
     * GET /api/v2/tickets/{ticket_id}/audits/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_audits#show-audit
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${ticket_id}/audits/${id}.json`,
        headers
      };
    },

    /**
     * Change a comment from public to private
     *
     * PUT /api/v2/tickets/{ticket_id}/audits/{id}/make_private.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_audits#change-a-comment-from-public-to-private
     */
    change: (options = {}) => {
      const { error } = Joi.object({
        ticket_id: _ticket_id.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ticket_id, id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${ticket_id}/audits/${id}/make_private.json`,
        headers,
        data
      };
    }
  };
};
