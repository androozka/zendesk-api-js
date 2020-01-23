const endpoint = require('../../../../src/api/support/audit_logs');
const { prepare } = require('../../../../src/utils/options');

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
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('listing audit logs', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/audit_logs.json`,
        headers
      });

      expect(endPoint.list({ params: 'filter[source_type]=user' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/audit_logs.json?filter[source_type]=user`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ params: 0 })).toThrowError();
    });
  });

  describe('getting audit logs', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.get({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/audit_logs/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.get()).toThrowError();
      expect(() => endPoint.get({})).toThrowError();
      expect(() => endPoint.get({ id: 'invalid' })).toThrowError();
    });
  });
});
