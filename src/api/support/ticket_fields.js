const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _id = Joi.number().min(1);
const _field_id = Joi.number().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Ticket Fields
     *
     * GET /api/v2/ticket_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#list-ticket-fields
     */
    list: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields.json`,
        headers
      };
    },

    /**
     * Show Ticket Field
     *
     * GET /api/v2/ticket_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#show-ticket-field
     */
    show: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${id}.json`,
        headers
      };
    },

    /**
     * Create Ticket Field
     *
     * POST /api/v2/ticket_fields.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#create-ticket-field
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_fields.json`,
        headers,
        data
      };
    },

    /**
     * Update Ticket Field
     *
     * PUT /api/v2/ticket_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#update-ticket-field
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
        url: `${url}/api/v2/ticket_fields/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Ticket Field
     *
     * DELETE /api/v2/ticket_fields/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#delete-ticket-field
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/ticket_fields/${id}.json`,
        headers
      };
    },

    /**
     * List Ticket Field Options
     *
     * GET /api/v2/ticket_fields/{field_id}/options.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#list-ticket-field-options
     */
    listOptions: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${field_id}/options.json`,
        headers
      };
    },

    /**
     * Show Ticket Field Option
     *
     * GET /api/v2/ticket_fields/{field_id}/options/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#show-ticket-field-option
     */
    showOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers
      };
    },

    /**
     * Create or Update Ticket Field Option
     *
     * POST /api/v2/ticket_fields/{field_id}/options.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#create-or-update-ticket-field-option
     */
    createOrUpdateOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Delete Ticket Field Option
     *
     * DELETE /api/v2/ticket_fields/{field_id}/options/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/ticket_fields#delete-ticket-field-option
     */
    deleteOption: (options = {}) => {
      const { error } = Joi.object({
        field_id: _field_id.required(),
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { field_id, id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/ticket_fields/${field_id}/options/${id}.json`,
        headers
      };
    }
  };
};
