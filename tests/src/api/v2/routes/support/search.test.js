const endpoint = require('../../../../../../src/api/v2/routes/support/search');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('search', () => {
  let search;

  beforeAll(() => (search = endpoint({ instance, headers })));
  afterAll(() => (search = null));

  describe('list search results', () => {
    it('should process w/ valid input', () => {
      expect(search({ search_string: 'query' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/search.json?query=query`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => search()).toThrowError();
      expect(() => search({})).toThrowError();
      expect(() => search('invalid')).toThrowError();
      expect(() => search({ search_string: 123 })).toThrowError();
      expect(() => search({ search_string: '' })).toThrowError();
    });
  });
});
