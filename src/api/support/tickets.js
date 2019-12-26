const Joi = require('@hapi/joi');
const { validate, prepare } = require('../../utils/options');

// Validation
const _type = Joi.string().valid(
  'tickets',
  'organizations',
  'users_requested',
  'users_ccd',
  'users_assigned',
  'recent'
);
const _id = Joi.number().min(1);
const _ids = Joi.string().min(3);
const _external_id = Joi.string().min(1);
const _name = Joi.string().min(1);
const _data = Joi.object();

// Initialize Endpoint
module.exports = (options = {}) => {
  const { error } = validate(options);
  if (error) throw new Error(error.details[0].message);

  const { url, headers } = prepare(options);

  return {
    /**
     * List Tickets
     *
     * GET /api/v2/tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-tickets
     */
    list: (options = {}) => {
      const { error } = Joi.object({
        type: _type,
        id: _id
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { type = 'tickets', id = 0 } = options;
      if (id && (type === 'tickets' || type === 'recent'))
        throw new Error(
          'if "id" is set, type cannont be "tickets" or "recent"'
        );

      return {
        method: 'GET',
        url: {
          tickets: `${url}/api/v2/tickets.json`,
          organizations: `${url}/api/v2/organizations/${id}/tickets.json`,
          users_requested: `${url}/api/v2/users/${id}/tickets/requested.json`,
          users_ccd: `${url}/api/v2/users/${id}/tickets/ccd.json`,
          users_assigned: `${url}/api/v2/users/${id}/tickets/assigned.json`,
          recent: `${url}/api/v2/tickets/recent.json`
        }[type],
        headers
      };
    },

    /**
     * List Tickets by External Id
     *
     * GET /api/v2/tickets.json?external_id={external_id}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-tickets-by-external-id
     */
    list_by_external_id: (options = {}) => {
      const { error } = Joi.object({
        external_id: _external_id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { external_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets.json?external_id=${external_id}`,
        headers
      };
    },

    /**
     * Show Ticket
     *
     * GET /api/v2/tickets/{id}.json
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
        url: `${url}/api/v2/tickets/${id}.json`,
        headers
      };
    },

    /**
     * Show Multiple Tickets
     *
     * GET /api/v2/tickets/show_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#show-multiple-tickets
     */
    show_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/show_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Create Ticket
     *
     * POST /api/v2/tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#create-ticket
     */
    create: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets.json`,
        headers,
        data
      };
    },

    /**
     * Create Many Tickets
     *
     * POST /api/v2/tickets/create_many.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#create-many-tickets
     */
    create_many: (options = {}) => {
      const { error } = Joi.object({
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/create_many.json`,
        headers,
        data
      };
    },

    /**
     * Update Ticket
     *
     * PUT /api/v2/tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#update-ticket
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
        url: `${url}/api/v2/tickets/${id}.json`,
        headers,
        data
      };
    },

    /**
     * Update Many Tickets
     *
     * PUT /api/v2/tickets/update_many.json
     * PUT /api/v2/tickets/update_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#update-many-tickets
     */
    update_many: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids,
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids = '', data } = options;
      const params = ids ? `?ids=${ids}` : '';
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/update_many.json${params}`,
        headers,
        data
      };
    },

    /**
     * Mark Ticket as Spam and Suspend Requester
     *
     * PUT /api/v2/tickets/{id}/mark_as_spam.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#mark-ticket-as-spam-and-suspend-requester
     */
    mark_as_spam: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${id}/mark_as_spam.json`,
        headers
      };
    },

    /**
     * Bulk Mark Tickets as Spam
     *
     * PUT /api/v2/tickets/mark_many_as_spam.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#bulk-mark-tickets-as-spam
     */
    mark_as_spam_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/mark_many_as_spam.json?ids=${ids}`,
        headers
      };
    },

    /**
     * Merge Tickets into Target Ticket
     *
     * POST /api/v2/tickets/{id}/merge.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#merge-tickets-into-target-ticket
     */
    merge: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required(),
        data: _data.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/${id}/merge.json`,
        headers,
        data
      };
    },

    /**
     * Ticket Related Information
     *
     * GET /api/v2/tickets/{id}/related.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#ticket-related-information
     */
    related: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/${id}/related.json`,
        headers
      };
    },

    /**
     * Delete Ticket
     *
     * DELETE /api/v2/tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#delete-ticket
     */
    delete: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/tickets/${id}.json`,
        headers
      };
    },

    /**
     * Bulk Delete Tickets
     *
     * DELETE /api/v2/tickets/destroy_many.json?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#bulk-delete-tickets
     */
    delete_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/tickets/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    /**
     * List deleted tickets
     *
     * GET /api/v2/deleted_tickets.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-deleted-tickets
     */
    deleted: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_tickets.json`,
        headers
      };
    },

    /**
     * Restore a previously deleted ticket
     *
     * PUT /api/v2/deleted_tickets/{id}/restore.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#restore-a-previously-deleted-ticket
     */
    restore: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/${id}/restore.json`,
        headers
      };
    },

    /**
     * Restore previously deleted tickets in bulk
     *
     * PUT /api/v2/deleted_tickets/restore_many?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#restore-previously-deleted-tickets-in-bulk
     */
    restore_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/restore_many?ids=${ids}`,
        headers
      };
    },

    /**
     * Delete ticket permanently
     *
     * DELETE /api/v2/deleted_tickets/{id}.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#delete-ticket-permanently
     */
    delete_permanently: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/${id}.json`,
        headers
      };
    },

    /**
     * Delete multiple tickets permanently
     *
     * DELETE /api/v2/deleted_tickets/destroy_many?ids={ids}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#delete-multiple-tickets-permanently
     */
    delete_permanently_bulk: (options = {}) => {
      const { error } = Joi.object({
        ids: _ids.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/destroy_many?ids=${ids}`,
        headers
      };
    },

    /**
     * List Collaborators for a Ticket
     *
     * GET /api/v2/tickets/{id}/collaborators.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-collaborators-for-a-ticket
     */
    collaborators: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/collaborators.json`,
        headers
      };
    },

    /**
     * List Followers for a Ticket
     *
     * GET /api/v2/tickets/{id}/followers
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-followers-for-a-ticket
     */
    followers: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/followers.json`,
        headers
      };
    },

    /**
     * List Email CCs for a Ticket
     *
     * GET /api/v2/tickets/{id}/email_ccs
     * https://developer.zendesk.com/rest_api/docs/support/tickets#list-email-ccs-for-a-ticket
     */
    email_ccs: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/email_ccs.json`,
        headers
      };
    },

    /**
     * Listing Ticket Incidents
     *
     * GET /api/v2/tickets/{id}/incidents.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#listing-ticket-incidents
     */
    incidents: (options = {}) => {
      const { error } = Joi.object({
        id: _id.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/incidents.json`,
        headers
      };
    },

    /**
     * Listing Ticket Problems
     *
     * GET /api/v2/problems.json
     * https://developer.zendesk.com/rest_api/docs/support/tickets#listing-ticket-problems
     */
    problems: () => {
      // Ignore any options
      return {
        method: 'GET',
        url: `${url}/api/v2/problems.json`,
        headers
      };
    },

    /**
     * Autocomplete Problems
     *
     * POST /api/v2/problems/autocomplete.json?text={name}
     * https://developer.zendesk.com/rest_api/docs/support/tickets#autocomplete-problems
     */
    autocomplete_problems: (options = {}) => {
      const { error } = Joi.object({
        name: _name.required()
      }).validate(options);
      if (error) throw new Error(error.details[0].message);

      const { name } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/problems/autocomplete.json?text=${name}`,
        headers
      };
    }
  };
};
