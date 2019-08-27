const endpoint = require('../../../../../../src/api/v2/routes/support/tickets');

const instance = 'instance';
const headers = {};

describe('tickets', () => {
  let tickets, id, ids, external_id, data, name;

  beforeEach(() => {
    tickets = endpoint({ instance, headers });
    id = 123;
    ids = '1,2,3';
    external_id = 456;
    data = { test: 'data' };
    name = 'name';
  });

  afterEach(() => {
    tickets = null;
    id = 0;
    ids = '';
    external_id = 0;
    data = null;
    name = '';
  });

  test('list tickets', () => {
    expect(tickets.list()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets.json`,
      headers
    });

    expect(tickets.list({ type: 'organizations', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tickets.json`,
      headers
    });

    expect(tickets.list({ type: 'users_requested', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/requested.json`,
      headers
    });

    expect(tickets.list({ type: 'users_ccd', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/ccd.json`,
      headers
    });

    expect(tickets.list({ type: 'users_assigned', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tickets/assigned.json`,
      headers
    });

    expect(tickets.list({ type: 'recent' })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/recent.json`,
      headers
    });
  });

  test('list by external id', () => {
    expect(tickets.list_by_external_id({ external_id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets.json?external_id=${external_id}`,
      headers
    });
  });

  test('show', () => {
    expect(tickets.show({ id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
      headers
    });
  });

  test('show many', () => {
    expect(tickets.show_many({ ids })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/show_many.json?ids=${ids}`,
      headers
    });
  });

  test('create', () => {
    expect(tickets.create({ data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/tickets.json`,
      headers,
      data
    });
  });

  test('create many', () => {
    expect(tickets.create_many({ data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/tickets/create_many.json`,
      headers,
      data
    });
  });

  test('update', () => {
    expect(tickets.update({ id, data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
      headers,
      data
    });
  });

  test('update many', () => {
    expect(tickets.update_many({ data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/update_many.json`,
      headers,
      data
    });

    expect(tickets.update_many({ ids, data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/update_many.json?ids=${ids}`,
      headers,
      data
    });
  });

  test('mark as spam', () => {
    expect(tickets.mark_as_spam({ id })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/mark_as_spam.json`,
      headers
    });
  });

  test('mark as spam bulk', () => {
    expect(tickets.mark_as_spam_bulk({ ids })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/mark_many_as_spam.json?ids=${ids}`,
      headers
    });
  });

  test('merge', () => {
    expect(tickets.merge({ id, data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/merge.json`,
      headers,
      data
    });
  });

  test('related', () => {
    expect(tickets.related({ id })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/related.json`,
      headers
    });
  });

  test('delete', () => {
    expect(tickets.delete({ id })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}.json`,
      headers
    });
  });

  test('delete bulk', () => {
    expect(tickets.delete_bulk({ ids })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/tickets/destroy_many.json?ids=${ids}`,
      headers
    });
  });

  test('deleted', () => {
    expect(tickets.deleted()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/deleted_tickets.json`,
      headers
    });
  });

  test('restore', () => {
    expect(tickets.restore({ id })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/${id}/restore.json`,
      headers
    });
  });

  test('restore bulk', () => {
    expect(tickets.restore_bulk({ ids })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/restore_many?ids=${ids}`,
      headers
    });
  });

  test('delete permanently', () => {
    expect(tickets.delete_permanently({ id })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/${id}.json`,
      headers
    });
  });

  test('delete permanently bulk', () => {
    expect(tickets.delete_permanently_bulk({ ids })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/deleted_tickets/destroy_many?ids=${ids}`,
      headers
    });
  });

  test('collaborators', () => {
    expect(tickets.collaborators({ id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/collaborators.json`,
      headers
    });
  });

  test('followers', () => {
    expect(tickets.followers({ id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/followers.json`,
      headers
    });
  });

  test('email ccs', () => {
    expect(tickets.email_ccs({ id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/email_ccs.json`,
      headers
    });
  });

  test('incidents', () => {
    expect(tickets.incidents({ id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/incidents.json`,
      headers
    });
  });

  test('problems', () => {
    expect(tickets.problems()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/problems.json`,
      headers
    });
  });

  test('autocomplete problems', () => {
    expect(tickets.autocomplete_problems({ name })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/problems/autocomplete.json?text=${name}`,
      headers
    });
  });
});
