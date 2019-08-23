const endpoint = require('../../../src/v2/support/tags');

describe('Tags', () => {
  const headers = {};
  const data = {};
  let tags;

  beforeAll(() => (tags = endpoint('', headers)));
  afterAll(() => (tags = null));

  test('List Tags', () => {
    expect(tags.list()).toEqual({
      method: 'GET',
      url: '/api/v2/tags.json',
      headers
    });
  });

  test('Show Tags', () => {
    expect(tags.show('tickets', 123)).toEqual({
      method: 'GET',
      url: '/api/v2/tickets/123/tags.json',
      headers
    });

    expect(tags.show('organizations', 123)).toEqual({
      method: 'GET',
      url: '/api/v2/organizations/123/tags.json',
      headers
    });

    expect(tags.show('users', 123)).toEqual({
      method: 'GET',
      url: '/api/v2/users/123/tags.json',
      headers
    });
  });

  test('Set Tags', () => {
    expect(tags.set('tickets', 123, data)).toEqual({
      method: 'POST',
      url: '/api/v2/tickets/123/tags.json',
      headers,
      data
    });

    expect(tags.set('organizations', 123, data)).toEqual({
      method: 'POST',
      url: '/api/v2/organizations/123/tags.json',
      headers,
      data
    });

    expect(tags.set('users', 123, data)).toEqual({
      method: 'POST',
      url: '/api/v2/users/123/tags.json',
      headers,
      data
    });
  });

  test('Add Tags', () => {
    expect(tags.add('tickets', 123, data)).toEqual({
      method: 'PUT',
      url: '/api/v2/tickets/123/tags.json',
      headers,
      data
    });

    expect(tags.add('organizations', 123, data)).toEqual({
      method: 'PUT',
      url: '/api/v2/organizations/123/tags.json',
      headers,
      data
    });

    expect(tags.add('users', 123, data)).toEqual({
      method: 'PUT',
      url: '/api/v2/users/123/tags.json',
      headers,
      data
    });
  });

  test('Remove Tags', () => {
    expect(tags.remove('tickets', 123, data)).toEqual({
      method: 'DELETE',
      url: '/api/v2/tickets/123/tags.json',
      headers,
      data
    });

    expect(tags.remove('organizations', 123, data)).toEqual({
      method: 'DELETE',
      url: '/api/v2/organizations/123/tags.json',
      headers,
      data
    });

    expect(tags.remove('users', 123, data)).toEqual({
      method: 'DELETE',
      url: '/api/v2/users/123/tags.json',
      headers,
      data
    });
  });

  test('Autocomplete Tags', () => {
    expect(tags.autocomplete('tag_name')).toEqual({
      method: 'GET',
      url: `/api/v2/autocomplete/tags.json?name=tag_name`,
      headers
    });
  });
});
