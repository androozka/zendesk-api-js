const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Ticket Forms
     *
     * GET /api/v2/ticket_forms.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#list-ticket-forms
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms.json`,
        headers
      };
    },

    /**
     * Create Ticket Forms
     *
     * POST /api/v2/ticket_forms.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#create-ticket-forms
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_forms.json`,
        headers,
        data
      };
    },

    /**
     * Show Ticket Form
     *
     * GET /api/v2/ticket_forms/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#show-ticket-form
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/${id}.json`,
        headers
      };
    },

    /**
     * Show Many Ticket Forms
     *
     * GET /api/v2/ticket_forms/show_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#show-many-ticket-forms
     */
    show_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_forms/show_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Update Ticket Forms
     *
     * PUT /api/v2/ticket_forms/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#update-ticket-forms
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
        url: `${url}/api/v2/ticket_forms/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Ticket Form
     *
     * DELETE /api/v2/ticket_forms/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#delete-ticket-form
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/ticket_forms/${id}.json`,
        headers
      };
    },

    /**
     * Reorder Ticket Forms
     *
     * PUT /api/v2/ticket_forms/reorder.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#reorder-ticket-forms
     */
    reorder: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/ticket_forms/reorder.json`,
        headers,
        data
      };
    },

    /**
     * Clone an already existing ticket form
     *
     * POST /api/v2/ticket_forms/{id}/clone.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_forms#clone-an-already-existing-ticket-form
     */
    clone: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_forms/${id}/clone.json`,
        headers
      };
    }
  };
};
