const endpoint = require('../../../../src/api/support/ticket_skips');
const { prepare } = require('../../../../src/utils/options');

describe('ticket skips', () => {
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

  describe('record a new skip for the current account', () => {
    it('should process w/ valid input', () => {
      const data = { skip: { ticket_id: 123, reason: 'I have no idea.' } };

      expect(endPoint.record({ data })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/skips.json`,
        headers,
        data
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.record()).toThrowError();
      expect(() => endPoint.record('invalid')).toThrowError();
      expect(() => endPoint.record({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list skips for the current account', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/skips.json`,
        headers
      });

      expect(endPoint.list({ ticket_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/skips.json`,
        headers
      });

      expect(endPoint.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/skips.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list({ ticket_id: 'invalid' })).toThrowError();
      expect(() => endPoint.list({ user_id: 'invalid' })).toThrowError();
    });
  });
});
