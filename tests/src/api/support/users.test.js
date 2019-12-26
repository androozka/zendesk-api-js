const endpoint = require('../../../../src/api/support/users');
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

  describe('list users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users.json`,
        headers
      });

      expect(endPoint.list({ type: 'groups', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/123/users.json`,
        headers
      });

      expect(endPoint.list({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/users.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      // Invalid "type"
      expect(() => endPoint.list({ type: 'invalid' })).toThrowError();
      expect(() => endPoint.list({ type: 'invalid', id: 0 })).toThrowError();
      expect(() => endPoint.list({ type: 123 })).toThrowError();
      expect(() => endPoint.list({ type: 123, id: 123 })).toThrowError();

      // Invalid "id"
      expect(() => endPoint.list({ type: '', id: 123 })).toThrowError();
      expect(() => endPoint.list({ type: 'groups' })).toThrowError();
      expect(() => endPoint.list({ type: 'groups', id: 0 })).toThrowError();
      expect(() => endPoint.list({ type: 'organizations' })).toThrowError();
      expect(() =>
        endPoint.list({ type: 'organizations', id: 0 })
      ).toThrowError();

      // Invalid "type" & "id"
      expect(() => endPoint.list({ id: 0 })).toThrowError();
      expect(() => endPoint.list({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
      expect(() => endPoint.show({ id: 0 })).toThrowError();
    });
  });

  describe('show many users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/show_many.json?ids=1,2,3`,
        headers
      });

      expect(endPoint.show_many({ external_ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/show_many.json?external_ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      // Missing options
      expect(() => endPoint.show_many()).toThrowError();
      expect(() => endPoint.show_many({})).toThrowError();

      // Invalid options
      expect(() => endPoint.show_many({ ids: 123 })).toThrowError();
      expect(() => endPoint.show_many({ external_ids: 123 })).toThrowError();
      expect(() =>
        endPoint.show_many({ ids: '1,2,3', external_ids: '1,2,3' })
      ).toThrowError();
    });
  });

  describe('user related information', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.related({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/related.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.related()).toThrowError();
      expect(() => endPoint.related({})).toThrowError();
      expect(() => endPoint.related({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create or update user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_or_update({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_or_update()).toThrowError();
      expect(() => endPoint.create_or_update({})).toThrowError();
      expect(() =>
        endPoint.create_or_update({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create or update many users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_or_update_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_or_update_many()).toThrowError();
      expect(() => endPoint.create_or_update_many({})).toThrowError();
      expect(() =>
        endPoint.create_or_update_many({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('merge self with another user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.merge_self({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/me/merge.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.merge_self()).toThrowError();
      expect(() => endPoint.merge_self({})).toThrowError();
      expect(() => endPoint.merge_self({ data: 'invalid' })).toThrowError();
    });
  });

  describe('merge end users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.merge({ id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/merge.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.merge()).toThrowError();
      expect(() => endPoint.merge({})).toThrowError();
      expect(() => endPoint.merge({ id: 'invalid', data: {} })).toThrowError();
      expect(() => endPoint.merge({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('create many users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create_many()).toThrowError();
      expect(() => endPoint.create_many({})).toThrowError();
      expect(() => endPoint.create_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ data: {} })).toThrowError();
      expect(() => endPoint.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() => endPoint.update({ id: 123 })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update many users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users.json`,
        headers,
        data: {}
      });

      expect(endPoint.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users.json?ids=1,2,3`,
        headers,
        data: {}
      });

      expect(endPoint.update_many({ external_ids: '1,2,3', data: {} })).toEqual(
        {
          method: 'PUT',
          url: `${url}/api/v2/users.json?external_ids=1,2,3`,
          headers,
          data: {}
        }
      );
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update_many()).toThrowError();
      expect(() => endPoint.update_many({})).toThrowError();
      expect(() => endPoint.update_many({ data: 'invalid' })).toThrowError();
      expect(() => endPoint.update_many({ ids: 123, data: {} })).toThrowError();
      expect(() =>
        endPoint.update_many({ external_ids: 123, data: {} })
      ).toThrowError();
      expect(() =>
        endPoint.update_many({ ids: '', external_ids: '', data: {} })
      ).toThrowError();
      expect(() =>
        endPoint.update_many({ ids: '1,2,3', external_ids: '1,2,3', data: {} })
      ).toThrowError();
    });
  });

  describe('delete many users', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json?ids=1,2,3`,
        headers
      });

      expect(endPoint.delete_many({ external_ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json?external_ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete_many()).toThrowError();
      expect(() => endPoint.delete_many({})).toThrowError();
      expect(() => endPoint.delete_many({ ids: '' })).toThrowError();
      expect(() => endPoint.delete_many({ ids: 123 })).toThrowError();
      expect(() => endPoint.delete_many({ external_ids: '' })).toThrowError();
      expect(() => endPoint.delete_many({ external_ids: 123 })).toThrowError();
    });
  });

  describe('delete user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete(123)).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('search', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.search({ query: 'valid_query' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/search.json?query=valid_query`,
        headers
      });

      expect(endPoint.search({ external_id: 'external_id' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/search.json?external_id=external_id`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.search()).toThrowError();
      expect(() => endPoint.search({})).toThrowError();
      expect(() => endPoint.search({ query: '' })).toThrowError();
      expect(() => endPoint.search({ external_id: '' })).toThrowError();
      expect(() =>
        endPoint.search({ query: '', external_id: '' })
      ).toThrowError();
      expect(() =>
        endPoint.search({ query: 'query', external_id: 'external_id' })
      ).toThrowError();
    });
  });

  describe('autocomplete', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/autocomplete.json?name=name`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.autocomplete()).toThrowError();
      expect(() => endPoint.autocomplete({})).toThrowError();
      expect(() => endPoint.autocomplete('name')).toThrowError();
      expect(() => endPoint.autocomplete({ name: 123 })).toThrowError();
      expect(() => endPoint.autocomplete({ name: '' })).toThrowError();
    });
  });

  describe('request create user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.request_create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/request_create.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.request_create()).toThrowError();
      expect(() => endPoint.request_create({})).toThrowError();
      expect(() => endPoint.request_create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list deleted users', () => {
    it('should process without input', () => {
      expect(endPoint.list_deleted()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_users.json`,
        headers
      });
    });
  });

  describe('show deleted user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show_deleted({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_users/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show_deleted()).toThrowError();
    });
  });

  describe('permanently delete user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.permanently_delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_users/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.permanently_delete()).toThrowError();
      expect(() => endPoint.permanently_delete({})).toThrowError();
      expect(() =>
        endPoint.permanently_delete({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('compliance deletion statuses', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.compliance_deletion_statuses({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/compliance_deletion_statuses.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.compliance_deletion_statuses()).toThrowError();
      expect(() =>
        endPoint.compliance_deletion_statuses('invalid')
      ).toThrowError();
      expect(() => endPoint.compliance_deletion_statuses({})).toThrowError();
      expect(() =>
        endPoint.compliance_deletion_statuses({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('current authenticated user', () => {
    it('should process without input', () => {
      expect(endPoint.current()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/me.json`,
        headers
      });
    });
  });
});
