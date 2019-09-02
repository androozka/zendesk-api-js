const endpoint = require('../../../../src/v2/support/tags');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('tags', () => {
  let tags;

  beforeEach(() => (tags = endpoint({ instance, headers })));
  afterEach(() => (tags = null));

  describe('list tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tags.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.list('invalid')).toThrowError();
    });
  });

  describe('show tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.show({ type: 'tickets', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers
      });

      expect(tags.show({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers
      });

      expect(tags.show({ type: 'users', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/tags.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.show()).toThrowError();
      expect(() => tags.show('invalid')).toThrowError();
      expect(() => tags.show({})).toThrowError();
      expect(() => tags.show({ invalid: '' })).toThrowError();
      expect(() => tags.show({ type: '' })).toThrowError();
      expect(() => tags.show({ type: 'tickets' })).toThrowError();
      expect(() => tags.show({ type: 'tickets', id: 0 })).toThrowError();
      expect(() =>
        tags.show({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('set tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.set({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(tags.set({ type: 'organizations', id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers,
        data: {}
      });

      expect(tags.set({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.set()).toThrowError();
      expect(() => tags.set('invalid')).toThrowError();
      expect(() => tags.set({})).toThrowError();
      expect(() => tags.set({ type: 'invalid' })).toThrowError();
      expect(() => tags.set({ type: 'tickets' })).toThrowError();
      expect(() => tags.set({ type: 'tickets', id: 0 })).toThrowError();
      expect(() => tags.set({ type: 'tickets', id: 123 })).toThrowError();
      expect(() =>
        tags.set({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('add tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.add({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(tags.add({ type: 'organizations', id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/123/tags.json`,
        headers,
        data: {}
      });

      expect(tags.add({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.add()).toThrowError();
      expect(() => tags.add('invalid')).toThrowError();
      expect(() => tags.add({})).toThrowError();
      expect(() => tags.add({ type: 'invalid' })).toThrowError();
      expect(() => tags.add({ type: 'tickets', id: 'invalid' })).toThrowError();
      expect(() => tags.add({ type: 'tickets', id: 0 })).toThrowError();
      expect(() => tags.add({ type: 'tickets', id: 123 })).toThrowError();
      expect(() =>
        tags.add({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('remove tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.remove({ type: 'tickets', id: 123, data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/tickets/123/tags.json`,
        headers,
        data: {}
      });

      expect(tags.remove({ type: 'organizations', id: 123, data: {} })).toEqual(
        {
          method: 'DELETE',
          url: `${url}/api/v2/organizations/123/tags.json`,
          headers,
          data: {}
        }
      );

      expect(tags.remove({ type: 'users', id: 123, data: {} })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123/tags.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.remove()).toThrowError();
      expect(() => tags.remove('invalid')).toThrowError();
      expect(() => tags.remove({})).toThrowError();
      expect(() => tags.remove({ invalid: '' })).toThrowError();
      expect(() => tags.remove({ type: '' })).toThrowError();
      expect(() => tags.remove({ type: 'tickets' })).toThrowError();
      expect(() => tags.remove({ type: 'tickets', id: 0 })).toThrowError();
      expect(() =>
        tags.remove({ type: 'tickets', id: 'invalid' })
      ).toThrowError();
      expect(() =>
        tags.remove({ type: 'tickets', id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('autocomplete tags', () => {
    it('should process w/ valid input', () => {
      expect(tags.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/autocomplete/tags.json?name=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => tags.autocomplete()).toThrowError();
      expect(() => tags.autocomplete('invalid')).toThrowError();
      expect(() => tags.autocomplete({})).toThrowError();
      expect(() => tags.autocomplete({ name: 0 })).toThrowError();
    });
  });
});
