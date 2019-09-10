const endpoint = require('../../../../src/v2/support/user_passwords');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('user passwords', () => {
  let userPasswords;

  beforeEach(() => (userPasswords = endpoint({ instance, headers })));
  afterEach(() => (userPasswords = null));

  describe("set a user's password", () => {
    it('should process w/ valid input', () => {
      expect(userPasswords.set({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/password.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => userPasswords.set()).toThrowError();
      expect(() => userPasswords.set('invalid')).toThrowError();
      expect(() => userPasswords.set({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        userPasswords.set({ user_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('change your password', () => {
    it('should process w/ valid input', () => {
      expect(userPasswords.change({ user_id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/password.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => userPasswords.change()).toThrowError();
      expect(() => userPasswords.change({})).toThrowError();
      expect(() => userPasswords.change('invalid')).toThrowError();
      expect(() => userPasswords.change({ id: 'invalid' })).toThrowError();
      expect(() =>
        userPasswords.change({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('get a list of password requirements', () => {
    it('should process w/ valid input', () => {
      expect(userPasswords.requirements({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/password/requirements.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => userPasswords.requirements()).toThrowError();
      expect(() => userPasswords.requirements({})).toThrowError();
      expect(() => userPasswords.requirements('invalid')).toThrowError();
      expect(() =>
        userPasswords.requirements({ user_id: 'invalid' })
      ).toThrowError();
    });
  });
});
