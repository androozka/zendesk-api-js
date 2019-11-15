const endpoint = require('../../../../src/v2/support/user_identities');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('user identities', () => {
  let user_identities;

  beforeEach(() => (user_identities = endpoint({ instance, headers })));
  afterEach(() => (user_identities = null));

  describe('list identities', () => {
    it('should process w/ valid input', () => {
      expect(user_identities.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/identities.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => user_identities.list()).toThrowError();
      expect(() => user_identities.list({})).toThrowError();
      expect(() => user_identities.list('invalid')).toThrowError();
      expect(() => user_identities.list({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('show identity', () => {
    test('should process w/ valid input', () => {
      expect(user_identities.show({ user_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.show()).toThrowError();
      expect(() => user_identities.show({})).toThrowError();
      expect(() => user_identities.show({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        user_identities.show({ user_id: 0, id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create identity', () => {
    test('should process w/ valid input', () => {
      expect(user_identities.create({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/identities.json`,
        headers,
        data: {}
      });

      expect(
        user_identities.create({ user_id: 123, end_users: false, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/identities.json`,
        headers,
        data: {}
      });

      expect(
        user_identities.create({ user_id: 123, end_users: true, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/end_users/123/identities.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.create()).toThrowError();
      expect(() => user_identities.create({})).toThrowError();
      expect(() => user_identities.create('invalid')).toThrowError();
      expect(() =>
        user_identities.create({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.create({ user_id: 123, end_users: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.create({ user_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update identity', () => {
    test('should process w/ valid input', () => {
      expect(
        user_identities.update({ user_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.update()).toThrowError();
      expect(() => user_identities.update({})).toThrowError();
      expect(() =>
        user_identities.update({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.update({ user_id: 123, id: 'invalid', data: {} })
      ).toThrowError();
      expect(() =>
        user_identities.update({ user_id: 123, id: 456 })
      ).toThrowError();
      expect(() =>
        user_identities.update({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('make identity primary', () => {
    test('should process w/ valid input', () => {
      expect(user_identities.make_primary({ user_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/make_primary`,
        headers,
        data: {}
      });

      expect(
        user_identities.make_primary({ user_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/make_primary`,
        headers,
        data: {}
      });

      expect(
        user_identities.make_primary({
          user_id: 123,
          id: 456,
          end_users: false,
          data: {}
        })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/make_primary`,
        headers,
        data: {}
      });

      expect(
        user_identities.make_primary({
          user_id: 123,
          id: 456,
          end_users: true,
          data: {}
        })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/end_users/123/identities/456/make_primary`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.make_primary()).toThrowError();
      expect(() => user_identities.make_primary({})).toThrowError();
      expect(() => user_identities.make_primary('invalid')).toThrowError();
      expect(() =>
        user_identities.make_primary({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.make_primary({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.make_primary({
          user_id: 123,
          id: 456,
          end_users: 'invalid'
        })
      ).toThrowError();
      expect(() =>
        user_identities.make_primary({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('verify identity', () => {
    test('should process w/ valid input', () => {
      expect(user_identities.verify({ user_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/verify`,
        headers,
        data: {}
      });

      expect(
        user_identities.verify({ user_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/verify`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.verify()).toThrowError();
      expect(() => user_identities.verify({})).toThrowError();
      expect(() => user_identities.verify('invalid')).toThrowError();
      expect(() =>
        user_identities.verify({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.verify({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.verify({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('request user verification', () => {
    test('should process w/ valid input', () => {
      expect(
        user_identities.request_verification({ user_id: 123, id: 456 })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/request_verification.json`,
        headers,
        data: {}
      });

      expect(
        user_identities.request_verification({
          user_id: 123,
          id: 456,
          data: {}
        })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/request_verification.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.request_verification()).toThrowError();
      expect(() => user_identities.request_verification({})).toThrowError();
      expect(() =>
        user_identities.request_verification('invalid')
      ).toThrowError();
      expect(() =>
        user_identities.request_verification({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.request_verification({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.request_verification({
          user_id: 123,
          id: 456,
          data: 'invalid'
        })
      ).toThrowError();
    });
  });

  describe('delete identity', () => {
    test('should process w/ valid input', () => {
      expect(user_identities.delete({ user_id: 123, id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => user_identities.delete()).toThrowError();
      expect(() => user_identities.delete({})).toThrowError();
      expect(() => user_identities.delete('invalid')).toThrowError();
      expect(() =>
        user_identities.delete({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        user_identities.delete({ user_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});
