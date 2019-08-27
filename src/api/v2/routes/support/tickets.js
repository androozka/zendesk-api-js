module.exports = ({ instance, headers }) => ({
  list: ({ type = '', id = 0 } = { type: '', id: 0 }) => ({
    method: 'GET',
    url: {
      '': `https://${instance}.zendesk.com/api/v2/tickets.json`,
      organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tickets.json`,
      users_requested: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/requested.json`,
      users_ccd: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/ccd.json`,
      users_assigned: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/assigned.json`,
      recent: `https://${instance}.zendesk.com/api/v2/tickets/recent.json`
    }[type],
    headers
  }),

  list_by_external_id: ({ external_id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets.json?external_id=${external_id}`,
    headers
  }),

  show: ({ id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
    headers
  }),

  show_many: ({ ids }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/show_many.json?ids=${ids}`,
    headers
  }),

  create: ({ data }) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/tickets.json`,
    headers,
    data
  }),

  create_many: ({ data }) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/tickets/create_many.json`,
    headers,
    data
  }),

  update: ({ id, data }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
    headers,
    data
  }),

  update_many: ({ ids = '', data }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/tickets/update_many.json${
      ids ? `?ids=${ids}` : ''
    }`,
    headers,
    data
  }),

  mark_as_spam: ({ id }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/mark_as_spam.json`,
    headers
  }),

  mark_as_spam_bulk: ({ ids }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/tickets/mark_many_as_spam.json?ids=${ids}`,
    headers
  }),

  merge: ({ id, data }) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/merge.json`,
    headers,
    data
  }),

  related: ({ id }) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/related.json`,
    headers
  }),

  delete: ({ id }) => ({
    method: 'DELETE',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
    headers
  }),

  delete_bulk: ({ ids }) => ({
    method: 'DELETE',
    url: `https://${instance}.zendesk.com/api/v2/tickets/destroy_many.json?ids=${ids}`,
    headers
  }),

  deleted: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/deleted_tickets.json`,
    headers
  }),

  restore: ({ id }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/${id}/restore.json`,
    headers
  }),

  restore_bulk: ({ ids }) => ({
    method: 'PUT',
    url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/restore_many?ids=${ids}`,
    headers
  }),

  delete_permanently: ({ id }) => ({
    method: 'DELETE',
    url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/${id}.json`,
    headers
  }),

  delete_permanently_bulk: ({ ids }) => ({
    method: 'DELETE',
    url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/destroy_many?ids=${ids}`,
    headers
  }),

  collaborators: ({ id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/collaborators.json`,
    headers
  }),

  followers: ({ id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/followers.json`,
    headers
  }),

  email_ccs: ({ id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/email_ccs.json`,
    headers
  }),

  incidents: ({ id }) => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/incidents.json`,
    headers
  }),

  problems: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/problems.json`,
    headers
  }),

  autocomplete_problems: ({ name }) => ({
    method: 'POST',
    url: `https://${instance}.zendesk.com/api/v2/problems/autocomplete.json?text=${name}`,
    headers
  })
});
