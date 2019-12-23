const endpoint = require('../../../src/api/support/search');
const { prepare } = require('../../../src/utils/options');

describe('object types', () => {
  let endPoint, options, url, headers;

  beforeEach(() => {
    options = {
      instance: 'instance',
      email: 'user@email.com',
      token: 'token'
    };
    endPoint = endpoint(options);
    ({ url, headers } = prepare(options));
  });

  afterEach(() => {
    options = null;
    endPoint = null;
    url = null;
    headers = null;
  });

  describe('init', () => {
    it('should setup endpoint object', () => {
      const ep = endpoint(options);
      expect(ep).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('list search results', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list({ search_string: 'valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/search.json?query=valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ search_string: 123 })).toThrowError();
      expect(() => endPoint.list({ search_string: '' })).toThrowError();
    });
  });

  describe('show results count', () => {
    it('should process valid input', () => {
      expect(endPoint.count({ search_string: 'valid' }));
    });

    it('should fail with invalid input', () => {
      expect(() => endPoint.count()).toThrowError();
      expect(() => endPoint.count({})).toThrowError();
      expect(() => endPoint.count('invalid')).toThrowError();
      expect(() => endPoint.count({ search_string: 123 })).toThrowError();
      expect(() => endPoint.count({ search_string: '' })).toThrowError();
    });
  });
});
