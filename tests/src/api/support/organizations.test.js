const endpoint = require('../../../../src/api/support/organizations');
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

  describe('list organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations.json`,
        headers
      });

      expect(endPoint.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/organizations.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.list('invalid')).toThrowError();
      expect(() => endPoint.list({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('autocomplete organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/autocomplete.json?name=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.autocomplete()).toThrowError();
      expect(() => endPoint.autocomplete({})).toThrowError();
      expect(() => endPoint.autocomplete('invalid')).toThrowError();
      expect(() => endPoint.autocomplete({ name: 0 })).toThrowError();
      expect(() => endPoint.autocomplete({ name: '' })).toThrowError();
    });
  });

  describe("show organizations's related information", () => {
    it('should process w/ valid input', () => {
      expect(endPoint.related({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/related.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.related()).toThrowError();
      expect(() => endPoint.related({})).toThrowError();
      expect(() => endPoint.related('invalid')).toThrowError();
      expect(() => endPoint.related({ id: 0 })).toThrowError();
      expect(() => endPoint.related({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show organization', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show('invalid')).toThrowError();
      expect(() => endPoint.show({ id: 0 })).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show many organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json?ids=1,2,3`,
        headers
      });

      expect(endPoint.show_many({ external_ids: '4,5,6' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/show_many.json?external_ids=4,5,6`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show_many()).toThrowError();
      expect(() => endPoint.show_many({})).toThrowError();
      expect(() => endPoint.show_many('invalid')).toThrowError();
      expect(() => endPoint.show_many({ ids: 0 })).toThrowError();
      expect(() => endPoint.show_many({ external_ids: 0 })).toThrowError();
      expect(() =>
        endPoint.show_many({ ids: '1,2,3', external_ids: '4,5,6' })
      ).toThrowError();
    });
  });

  describe('create organization', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create many organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_many()).toThrowError();
      expect(() => endPoint.create_many({})).toThrowError();
      expect(() => endPoint.create_many('invalid')).toThrowError();
      expect(() => endPoint.create_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create or update organization', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_or_update({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organizations/create_or_update.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_or_update()).toThrowError();
      expect(() => endPoint.create_or_update({})).toThrowError();
      expect(() => endPoint.create_or_update('invalid')).toThrowError();
      expect(() =>
        endPoint.create_or_update({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update organization', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update('invalid')).toThrowError();
      expect(() => endPoint.update({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update many organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json`,
        headers,
        data: {}
      });

      expect(endPoint.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organizations/update_many.json?ids=1,2,3`,
        headers,
        data: {}
      });

      expect(endPoint.update_many({ external_ids: '4,5,6', data: {} })).toEqual(
        {
          method: 'PUT',
          url: `${url}/api/v2/organizations/update_many.json?external_ids=4,5,6`,
          headers,
          data: {}
        }
      );
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_many()).toThrowError();
      expect(() => endPoint.update_many({})).toThrowError();
      expect(() => endPoint.update_many('invalid')).toThrowError();
      expect(() => endPoint.update_many({ data: 'invalid' })).toThrowError();
      expect(() => endPoint.update_many({ ids: 0, data: {} })).toThrowError();
      expect(() =>
        endPoint.update_many({ external_ids: 0, data: {} })
      ).toThrowError();
      expect(() =>
        endPoint.update_many({
          ids: '1,2,3',
          external_ids: '4,5,6',
          data: {}
        })
      ).toThrowError();
    });
  });

  describe('delete organization', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({ id: 0 })).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('bulk delete organizations', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json?ids=1,2,3`,
        headers
      });

      expect(endPoint.delete_many({ external_ids: '4,5,6' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organizations/destroy_many.json?external_ids=4,5,6`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_many()).toThrowError();
      expect(() => endPoint.delete_many({})).toThrowError();
      expect(() => endPoint.delete_many('invalid')).toThrowError();
      expect(() => endPoint.delete_many({ ids: 0 })).toThrowError();
      expect(() => endPoint.delete_many({ external_ids: 0 })).toThrowError();
      expect(() =>
        endPoint.delete_many({ ids: '1,2,3', external_ids: '4,5,6' })
      ).toThrowError();
    });
  });

  describe('search organization by external id', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.search({ external_id: '123' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/search.json?external_id=123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.search()).toThrowError();
      expect(() => endPoint.search({})).toThrowError();
      expect(() => endPoint.search('invalid')).toThrowError();
      expect(() => endPoint.search({ external_id: 0 })).toThrowError();
    });
  });
});
