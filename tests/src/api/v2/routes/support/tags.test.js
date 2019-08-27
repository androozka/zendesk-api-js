const endpoint = require('../../../../../../src/api/v2/routes/support/tags');

const instance = 'instance';
const headers = {};

describe('tags', () => {
  let tags, id, data, name;

  beforeEach(() => {
    tags = endpoint({ instance, headers });
    id = 123;
    data = {};
    name = 'tag_name';
  });

  afterEach(() => {
    tags = null;
    id = 0;
    data = null;
    name = '';
  });

  test('list tags', () => {
    expect(tags.list()).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tags.json`,
      headers
    });
  });

  test('show tags', () => {
    expect(tags.show({ type: 'tickets', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      headers
    });

    expect(tags.show({ type: 'organizations', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      headers
    });

    expect(tags.show({ type: 'users', id })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`,
      headers
    });
  });

  test('set tags', () => {
    expect(tags.set({ type: 'tickets', id, data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.set({ type: 'organizations', id, data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.set({ type: 'users', id, data })).toEqual({
      method: 'POST',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`,
      headers,
      data
    });
  });

  test('add tags', () => {
    expect(tags.add({ type: 'tickets', id, data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.add({ type: 'organizations', id, data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.add({ type: 'users', id, data })).toEqual({
      method: 'PUT',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`,
      headers,
      data
    });
  });

  test('remove tags', () => {
    expect(tags.remove({ type: 'tickets', id, data })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/tickets/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.remove({ type: 'organizations', id, data })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/organizations/${id}/tags.json`,
      headers,
      data
    });

    expect(tags.remove({ type: 'users', id, data })).toEqual({
      method: 'DELETE',
      url: `https://${instance}.zendesk.com/api/v2/users/${id}/tags.json`,
      headers,
      data
    });
  });

  test('autocomplete tags', () => {
    expect(tags.autocomplete({ name })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/autocomplete/tags.json?name=${name}`,
      headers
    });
  });
});
