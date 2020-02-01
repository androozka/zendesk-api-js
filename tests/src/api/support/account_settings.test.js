const endpoint = require('../../../../src/api/support/account_settings');
const { prepare } = require('../../../../src/utils/options');

describe('Account Settings', () => {
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

  describe('Show Settings', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/account/settings.json`,
        headers
      });
    });
  });

  describe('Update Account Settings', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/account/settings.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ data: 'invalid' })).toThrowError();
    });
  });
});
