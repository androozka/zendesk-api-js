module.exports = (instance, headers) => ({
  list: () => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/tags.json`,
    headers
  }),

  show: (type, id) => ({
    method: 'GET',
    url: {
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      users: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`
    }[type],
    headers
  }),

  set: (type, id, data) => ({
    method: 'POST',
    url: {
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      users: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`
    }[type],
    headers,
    data
  }),

  add: (type, id, data) => ({
    method: 'PUT',
    url: {
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      users: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`
    }[type],
    headers,
    data
  }),

  remove: (type, id, data) => ({
    method: 'DELETE',
    url: {
      tickets: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      organizations: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      users: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`
    }[type],
    headers,
    data
  }),

  autocomplete: name => ({
    method: 'GET',
    url: `https://${instance}.zendesk.com/api/v2/autocomplete/tags.json?name=${name}`,
    headers
  })
});
