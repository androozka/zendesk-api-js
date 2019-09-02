const endpoint = require('../../../../src/v2/support/organizations');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('organizations', () => {
  let organizations;

  beforeEach(() => (organizations = endpoint({ instance, headers })));
  afterEach(() => (organizations = null));

  describe('list organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations.json`,
        headers
      });

      expect(organizations.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/organizations.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.list('invalid')).toThrowError();
      expect(() => organizations.list({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('autocomplete organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/autocomplete.json?name=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.autocomplete()).toThrowError();
      expect(() => organizations.autocomplete({})).toThrowError();
      expect(() => organizations.autocomplete('invalid')).toThrowError();
      expect(() => organizations.autocomplete({ name: 0 })).toThrowError();
      expect(() => organizations.autocomplete({ name: '' })).toThrowError();
    });
  });

  describe("show organizations's related information", () => {
    it('should process w/ valid input', () => {
      expect(organizations.related({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/related.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.related()).toThrowError();
      expect(() => organizations.related({})).toThrowError();
      expect(() => organizations.related('invalid')).toThrowError();
      expect(() => organizations.related({ id: 0 })).toThrowError();
      expect(() => organizations.related({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show organization', () => {
    it('should process w/ valid input', () => {
      expect(organizations.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.show()).toThrowError();
      expect(() => organizations.show({})).toThrowError();
      expect(() => organizations.show('invalid')).toThrowError();
      expect(() => organizations.show({ id: 0 })).toThrowError();
      expect(() => organizations.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show many organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json?ids=1,2,3`,
        headers
      });

      expect(organizations.show_many({ external_ids: '4,5,6' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json?external_ids=4,5,6`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.show_many()).toThrowError();
      expect(() => organizations.show_many({})).toThrowError();
      expect(() => organizations.show_many('invalid')).toThrowError();
      expect(() => organizations.show_many({ ids: 0 })).toThrowError();
      expect(() => organizations.show_many({ external_ids: 0 })).toThrowError();
      expect(() =>
        organizations.show_many({ ids: '1,2,3', external_ids: '4,5,6' })
      ).toThrowError();
    });
  });

  describe('create organization', () => {
    it('should process w/ valid input', () => {
      expect(organizations.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.create()).toThrowError();
      expect(() => organizations.create({})).toThrowError();
      expect(() => organizations.create('invalid')).toThrowError();
      expect(() => organizations.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create many organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.create_many()).toThrowError();
      expect(() => organizations.create_many({})).toThrowError();
      expect(() => organizations.create_many('invalid')).toThrowError();
      expect(() =>
        organizations.create_many({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create or update organization', () => {
    it('should process w/ valid input', () => {
      expect(organizations.create_or_update({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/create_or_update.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.create_or_update()).toThrowError();
      expect(() => organizations.create_or_update({})).toThrowError();
      expect(() => organizations.create_or_update('invalid')).toThrowError();
      expect(() =>
        organizations.create_or_update({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update organization', () => {
    it('should process w/ valid input', () => {
      expect(organizations.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.update()).toThrowError();
      expect(() => organizations.update({})).toThrowError();
      expect(() => organizations.update('invalid')).toThrowError();
      expect(() => organizations.update({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update many organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json`,
        headers,
        data: {}
      });

      expect(organizations.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json?ids=1,2,3`,
        headers,
        data: {}
      });

      expect(
        organizations.update_many({ external_ids: '4,5,6', data: {} })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json?external_ids=4,5,6`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.update_many()).toThrowError();
      expect(() => organizations.update_many({})).toThrowError();
      expect(() => organizations.update_many('invalid')).toThrowError();
      expect(() =>
        organizations.update_many({ data: 'invalid' })
      ).toThrowError();
      expect(() =>
        organizations.update_many({ ids: 0, data: {} })
      ).toThrowError();
      expect(() =>
        organizations.update_many({ external_ids: 0, data: {} })
      ).toThrowError();
      expect(() =>
        organizations.update_many({
          ids: '1,2,3',
          external_ids: '4,5,6',
          data: {}
        })
      ).toThrowError();
    });
  });

  describe('delete organization', () => {
    it('should process w/ valid input', () => {
      expect(organizations.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.delete()).toThrowError();
      expect(() => organizations.delete({})).toThrowError();
      expect(() => organizations.delete('invalid')).toThrowError();
      expect(() => organizations.delete({ id: 0 })).toThrowError();
      expect(() => organizations.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('bulk delete organizations', () => {
    it('should process w/ valid input', () => {
      expect(organizations.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json?ids=1,2,3`,
        headers
      });

      expect(organizations.delete_many({ external_ids: '4,5,6' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json?external_ids=4,5,6`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.delete_many()).toThrowError();
      expect(() => organizations.delete_many({})).toThrowError();
      expect(() => organizations.delete_many('invalid')).toThrowError();
      expect(() => organizations.delete_many({ ids: 0 })).toThrowError();
      expect(() =>
        organizations.delete_many({ external_ids: 0 })
      ).toThrowError();
      expect(() =>
        organizations.delete_many({ ids: '1,2,3', external_ids: '4,5,6' })
      ).toThrowError();
    });
  });

  describe('search organization by external id', () => {
    it('should process w/ valid input', () => {
      expect(organizations.search({ external_id: '123' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/search.json?external_id=123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => organizations.search()).toThrowError();
      expect(() => organizations.search({})).toThrowError();
      expect(() => organizations.search('invalid')).toThrowError();
      expect(() => organizations.search({ external_id: 0 })).toThrowError();
    });
  });
});
