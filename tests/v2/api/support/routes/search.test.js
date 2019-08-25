const endpoint = require('../../../../../src/v2/api/support/routes/search');

describe('Search', () => {
  const instance = 'instance';
  const headers = {};
  const search_string = 'type:ticket status:open';
  let search;

  beforeAll(() => (search = endpoint(instance, headers)));
  afterAll(() => (search = null));

  test('Search', () => {
    expect(search(search_string)).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/search.json?query=${search_string}`,
      headers
    });
  });
});
