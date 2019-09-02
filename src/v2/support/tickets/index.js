const validate = require('./validate');

module.exports = ({ instance, headers }) => {
  const url = `https://${instance}.zendesk.com`;

  return {
    list: (options = {}) => {
      const { error } = validate.list(options);
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

    list_by_external_id: (options = {}) => {
      const { error } = validate.list_by_external_id(options);
      if (error) throw new Error(error.details[0].message);

      const { external_id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets.json?external_id=${external_id}`,
        headers
      };
    },

    show: (options = {}) => {
      const { error } = validate.show(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}.json`,
        headers
      };
    },

    show_many: (options = {}) => {
      const { error } = validate.show_many(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/show_many.json?ids=${ids}`,
        headers
      };
    },

    create: (options = {}) => {
      const { error } = validate.create(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets.json`,
        headers,
        data
      };
    },

    create_many: (options = {}) => {
      const { error } = validate.create_many(options);
      if (error) throw new Error(error.details[0].message);

      const { data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/create_many.json`,
        headers,
        data
      };
    },

    update: (options = {}) => {
      const { error } = validate.update(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${id}.json`,
        headers,
        data
      };
    },

    update_many: (options = {}) => {
      const { error } = validate.update_many(options);
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

    mark_as_spam: (options = {}) => {
      const { error } = validate.mark_as_spam(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/${id}/mark_as_spam.json`,
        headers
      };
    },

    mark_as_spam_bulk: (options = {}) => {
      const { error } = validate.mark_as_spam_bulk(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/tickets/mark_many_as_spam.json?ids=${ids}`,
        headers
      };
    },

    merge: (options = {}) => {
      const { error } = validate.merge(options);
      if (error) throw new Error(error.details[0].message);

      const { id, data } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/${id}/merge.json`,
        headers,
        data
      };
    },

    related: (options = {}) => {
      const { error } = validate.related(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'POST',
        url: `${url}/api/v2/tickets/${id}/related.json`,
        headers
      };
    },

    delete: (options = {}) => {
      const { error } = validate.delete(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/tickets/${id}.json`,
        headers
      };
    },

    delete_bulk: (options = {}) => {
      const { error } = validate.delete_bulk(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/tickets/destroy_many.json?ids=${ids}`,
        headers
      };
    },

    deleted: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/deleted_tickets.json`,
        headers
      };
    },

    restore: (options = {}) => {
      const { error } = validate.restore(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/${id}/restore.json`,
        headers
      };
    },

    restore_bulk: (options = {}) => {
      const { error } = validate.restore_bulk(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'PUT',
        url: `${url}/api/v2/deleted_tickets/restore_many?ids=${ids}`,
        headers
      };
    },

    delete_permanently: (options = {}) => {
      const { error } = validate.delete_permanently(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/${id}.json`,
        headers
      };
    },

    delete_permanently_bulk: (options = {}) => {
      const { error } = validate.delete_permanently_bulk(options);
      if (error) throw new Error(error.details[0].message);

      const { ids } = options;
      return {
        method: 'DELETE',
        url: `${url}/api/v2/deleted_tickets/destroy_many?ids=${ids}`,
        headers
      };
    },

    collaborators: (options = {}) => {
      const { error } = validate.collaborators(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/collaborators.json`,
        headers
      };
    },

    followers: (options = {}) => {
      const { error } = validate.followers(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/followers.json`,
        headers
      };
    },

    email_ccs: (options = {}) => {
      const { error } = validate.email_ccs(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/email_ccs.json`,
        headers
      };
    },

    incidents: (options = {}) => {
      const { error } = validate.incidents(options);
      if (error) throw new Error(error.details[0].message);

      const { id } = options;
      return {
        method: 'GET',
        url: `${url}/api/v2/tickets/${id}/incidents.json`,
        headers
      };
    },

    problems: (options = null) => {
      if (options) throw new Error('no options are allowed');

      return {
        method: 'GET',
        url: `${url}/api/v2/problems.json`,
        headers
      };
    },

    autocomplete_problems: (options = {}) => {
      const { error } = validate.autocomplete_problems(options);
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
