const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Suspended Tickets
     *
     * GET /api/v2/suspended_tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#list-suspended-tickets
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets.json`,
        headers
      };
    },

    /**
     * Show Suspended Ticket
     *
     * GET /api/v2/suspended_tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#show-suspended-ticket
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/suspended_tickets/${id}.json`,
        headers
      };
    },

    /**
     * Recover Suspended Ticket
     *
     * PUT /api/v2/suspended_tickets/{id}/recover.json
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#recover-suspended-ticket
     */
    recover: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/${id}/recover.json`,
        headers
      };
    },

    /**
     * Recover Multiple Suspended Tickets
     *
     * PUT /api/v2/suspended_tickets/recover_many.json?ids={id1},{id2}
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#recover-multiple-suspended-tickets
     */
    recover_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/suspended_tickets/recover_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Delete Suspended Ticket
     *
     * DELETE /api/v2/suspended_tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#delete-suspended-ticket
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/${id}.json`,
        headers
      };
    },

    /**
     * Delete Multiple Suspended Tickets
     *
     * DELETE /api/v2/suspended_tickets/destroy_many.json?ids={id1},{id2}
     * https://developer.zendesk.com/rest_api/docs/support/suspended_tickets#delete-multiple-suspended-tickets
     */
    delete_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/suspended_tickets/destroy_many.json?ids=${ids}`,
        headers
      };
    }
  };
};
