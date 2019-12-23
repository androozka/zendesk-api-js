const endpoint = require('../../../src/api/support/tags');
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

  describe('list tags', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tags.json`,
        headers
      });
    });
  });

  describe('show tags', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ type: 'tickets', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers
      });

      expect(endPoint.show({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers
      });

      expect(endPoint.show({ type: 'users', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tags.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ invalid: '' })).toThrowError();
      expect(() => endPoint.show({ type: '' })).toThrowError();
      expect(() => endPoint.show({ type: 'tickets' })).toThrowError();
      expect(() => endPoint.show({ type: 'tickets', id: 0 })).toThrowError();
      expect(() =>
        endPoint.show({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('set tags', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.set({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.set({ type: 'organizations', id: 123, data: {} })
      ).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers,
        data: {}
      });

      expect(endPoint.set({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.set()).toThrowError();
      expect(() => endPoint.set('invalid')).toThrowError();
      expect(() => endPoint.set({})).toThrowError();
      expect(() => endPoint.set({ type: 'invalid' })).toThrowError();
      expect(() => endPoint.set({ type: 'tickets' })).toThrowError();
      expect(() => endPoint.set({ type: 'tickets', id: 0 })).toThrowError();
      expect(() => endPoint.set({ type: 'tickets', id: 123 })).toThrowError();
      expect(() =>
        endPoint.set({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('add tags', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.add({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.add({ type: 'organizations', id: 123, data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers,
        data: {}
      });

      expect(endPoint.add({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.add()).toThrowError();
      expect(() => endPoint.add('invalid')).toThrowError();
      expect(() => endPoint.add({})).toThrowError();
      expect(() => endPoint.add({ type: 'invalid' })).toThrowError();
      expect(() =>
        endPoint.add({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
      expect(() => endPoint.add({ type: 'tickets', id: 0 })).toThrowError();
      expect(() => endPoint.add({ type: 'tickets', id: 123 })).toThrowError();
      expect(() =>
        endPoint.add({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('remove tags', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.remove({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(
        endPoint.remove({ type: 'organizations', id: 123, data: {} })
      ).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers,
        data: {}
      });

      expect(endPoint.remove({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.remove()).toThrowError();
      expect(() => endPoint.remove('invalid')).toThrowError();
      expect(() => endPoint.remove({})).toThrowError();
      expect(() => endPoint.remove({ invalid: '' })).toThrowError();
      expect(() => endPoint.remove({ type: '' })).toThrowError();
      expect(() => endPoint.remove({ type: 'tickets' })).toThrowError();
      expect(() => endPoint.remove({ type: 'tickets', id: 0 })).toThrowError();
      expect(() =>
        endPoint.remove({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
      expect(() =>
        endPoint.remove({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('autocomplete tags', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/autocomplete/tags.json?name=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.autocomplete()).toThrowError();
      expect(() => endPoint.autocomplete('invalid')).toThrowError();
      expect(() => endPoint.autocomplete({})).toThrowError();
      expect(() => endPoint.autocomplete({ name: 0 })).toThrowError();
    });
  });
});
