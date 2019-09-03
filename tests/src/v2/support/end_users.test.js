const endpoint = require('../../../../src/v2/support/end_users');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('end users', () => {
  let end_users;

  beforeEach(() => (end_users = endpoint({ instance, headers })));
  afterEach(() => (end_users = null));

  describe('show user', () => {
    it('should process w/ valid input', () => {
      expect(end_users.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/end_users/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => end_users.show()).toThrowError();
      expect(() => end_users.show('invalid')).toThrowError();
      expect(() => end_users.show({})).toThrowError();
      expect(() => end_users.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('update user', () => {
    it('should process w/ valid input', () => {
      expect(end_users.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/end_users/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => end_users.update()).toThrowError();
      expect(() => end_users.update('invalid')).toThrowError();
      expect(() => end_users.update({})).toThrowError();
      expect(() => end_users.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        end_users.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });
});
