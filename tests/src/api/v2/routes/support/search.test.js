const endpoint = require('../../../../../../src/api/v2/routes/support/search');

const instance = 'instance';
const headers = {};

describe('search', () => {
  let search, search_string;

  beforeAll(() => {
    search = endpoint({ instance, headers });
    search_string = 'type:ticket status:open';
  });

  afterAll(() => {
    search = null;
  });

  test('search', () => {
    expect(search({ search_string })).toEqual({
      method: 'GET',
      url: `https://${instance}.zendesk.com/api/v2/search.json?query=${search_string}`,
      headers
    });
  });
});
