const endpoint = require('../../../../src/api/support/user_passwords');
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
      const ep = endpoint(options);
      expect(ep).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe("set a user's password", () => {
    it('should process w/ valid input', () => {
      expect(endPoint.set({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/password.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.set()).toThrowError();
      expect(() => endPoint.set('invalid')).toThrowError();
      expect(() => endPoint.set({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.set({ user_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('change your password', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.change({ user_id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/password.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.change()).toThrowError();
      expect(() => endPoint.change({})).toThrowError();
      expect(() => endPoint.change('invalid')).toThrowError();
      expect(() => endPoint.change({ id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.change({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('get a list of password requirements', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.requirements({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/password/requirements.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.requirements()).toThrowError();
      expect(() => endPoint.requirements({})).toThrowError();
      expect(() => endPoint.requirements('invalid')).toThrowError();
      expect(() =>
        endPoint.requirements({ user_id: 'invalid' })
      ).toThrowError();
    });
  });
});
