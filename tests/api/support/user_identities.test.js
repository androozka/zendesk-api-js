const endpoint = require('../../../src/api/support/user_identities');
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

  describe('list identities', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/identities.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list()).toThrowError();
      expect(() => endPoint.list({})).toThrowError();
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('show identity', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.show({ user_id: 123, id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ user_id: 'invalid' })).toThrowError();
      expect(() => endPoint.show({ user_id: 0, id: 'invalid' })).toThrowError();
    });
  });

  describe('create identity', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.create({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/identities.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.create({ user_id: 123, end_users: false, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/identities.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.create({ user_id: 123, end_users: true, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/end_users/123/identities.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.create({ user_id: 123, end_users: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.create({ user_id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update identity', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.update({ user_id: 123, id: 456, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.update({ user_id: 123, id: 'invalid', data: {} })
      ).toThrowError();
      expect(() => endPoint.update({ user_id: 123, id: 456 })).toThrowError();
      expect(() =>
        endPoint.update({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('make identity primary', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.make_primary({ user_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/make_primary`,
        headers,
        data: {}
      });

      expect(
        endPoint.make_primary({ user_id: 123, id: 456, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/make_primary`,
        headers,
        data: {}
      });

      expect(
        endPoint.make_primary({
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
        endPoint.make_primary({
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
      expect(() => endPoint.make_primary()).toThrowError();
      expect(() => endPoint.make_primary({})).toThrowError();
      expect(() => endPoint.make_primary('invalid')).toThrowError();
      expect(() =>
        endPoint.make_primary({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.make_primary({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.make_primary({
          user_id: 123,
          id: 456,
          end_users: 'invalid'
        })
      ).toThrowError();
      expect(() =>
        endPoint.make_primary({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('verify identity', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.verify({ user_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/verify`,
        headers,
        data: {}
      });

      expect(endPoint.verify({ user_id: 123, id: 456, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/verify`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => endPoint.verify()).toThrowError();
      expect(() => endPoint.verify({})).toThrowError();
      expect(() => endPoint.verify('invalid')).toThrowError();
      expect(() => endPoint.verify({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.verify({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.verify({ user_id: 123, id: 456, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('request user verification', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.request_verification({ user_id: 123, id: 456 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/identities/456/request_verification.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.request_verification({
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
      expect(() => endPoint.request_verification()).toThrowError();
      expect(() => endPoint.request_verification({})).toThrowError();
      expect(() => endPoint.request_verification('invalid')).toThrowError();
      expect(() =>
        endPoint.request_verification({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.request_verification({ user_id: 123, id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.request_verification({
          user_id: 123,
          id: 456,
          data: 'invalid'
        })
      ).toThrowError();
    });
  });

  describe('delete identity', () => {
    test('should process w/ valid input', () => {
      expect(endPoint.delete({ user_id: 123, id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123/identities/456.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({ user_id: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.delete({ user_id: 123, id: 'invalid' })
      ).toThrowError();
    });
  });
});
