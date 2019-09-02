const endpoint = require('../../../../src/v2/support/users');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('users', () => {
  let users;

  beforeEach(() => (users = endpoint({ instance, headers })));
  afterEach(() => (users = null));

  describe('list users', () => {
    it('should process w/ valid input', () => {
      expect(users.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users.json`,
        headers
      });

      expect(users.list({ type: 'groups', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/123/users.json`,
        headers
      });

      expect(users.list({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organizations/123/users.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      // Invalid "type"
      expect(() => users.list({ type: 'invalid' })).toThrowError();
      expect(() => users.list({ type: 'invalid', id: 0 })).toThrowError();
      expect(() => users.list({ type: 123 })).toThrowError();
      expect(() => users.list({ type: 123, id: 123 })).toThrowError();

      // Invalid "id"
      expect(() => users.list({ type: '', id: 123 })).toThrowError();
      expect(() => users.list({ type: 'groups' })).toThrowError();
      expect(() => users.list({ type: 'groups', id: 0 })).toThrowError();
      expect(() => users.list({ type: 'organizations' })).toThrowError();
      expect(() => users.list({ type: 'organizations', id: 0 })).toThrowError();

      // Invalid "type" & "id"
      expect(() => users.list({ id: 0 })).toThrowError();
      expect(() => users.list({ id: 'invalid' })).toThrowError();
    });
  });

  describe('show user', () => {
    test('should process w/ valid input', () => {
      expect(users.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.show()).toThrowError();
      expect(() => users.show({})).toThrowError();
      expect(() => users.show({ id: 'invalid' })).toThrowError();
      expect(() => users.show({ id: 0 })).toThrowError();
    });
  });

  describe('show many users', () => {
    test('should process w/ valid input', () => {
      expect(users.show_many({ ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/show_many.json?ids=1,2,3`,
        headers
      });

      expect(users.show_many({ external_ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/show_many.json?external_ids=1,2,3`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      // Missing options
      expect(() => users.show_many()).toThrowError();
      expect(() => users.show_many({})).toThrowError();

      // Invalid options
      expect(() => users.show_many({ ids: 123 })).toThrowError();
      expect(() => users.show_many({ external_ids: 123 })).toThrowError();
      expect(() =>
        users.show_many({ ids: '1,2,3', external_ids: '1,2,3' })
      ).toThrowError();
    });
  });

  describe('user related information', () => {
    test('should process w/ valid input', () => {
      expect(users.related({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/related.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.related()).toThrowError();
      expect(() => users.related({})).toThrowError();
      expect(() => users.related({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create user', () => {
    test('should process w/ valid input', () => {
      expect(users.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.create()).toThrowError();
      expect(() => users.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create or update user', () => {
    test('should process w/ valid input', () => {
      expect(users.create_or_update({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.create_or_update()).toThrowError();
      expect(() => users.create_or_update({})).toThrowError();
      expect(() => users.create_or_update({ data: 'invalid' })).toThrowError();
    });
  });

  describe('create or update many users', () => {
    test('should process w/ valid input', () => {
      expect(users.create_or_update_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_or_update_many.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.create_or_update_many()).toThrowError();
      expect(() => users.create_or_update_many({})).toThrowError();
      expect(() =>
        users.create_or_update_many({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('merge self with another user', () => {
    test('should process w/ valid input', () => {
      expect(users.merge_self({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/me/merge.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.merge_self()).toThrowError();
      expect(() => users.merge_self({})).toThrowError();
      expect(() => users.merge_self({ data: 'invalid' })).toThrowError();
    });
  });

  describe('merge end users', () => {
    test('should process w/ valid input', () => {
      expect(users.merge({ id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/merge.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.merge()).toThrowError();
      expect(() => users.merge({})).toThrowError();
      expect(() => users.merge({ id: 'invalid', data: {} })).toThrowError();
      expect(() => users.merge({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('create many users', () => {
    test('should process w/ valid input', () => {
      expect(users.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/create_many.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.create_many()).toThrowError();
      expect(() => users.create_many({})).toThrowError();
      expect(() => users.create_many({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update user', () => {
    test('should process w/ valid input', () => {
      expect(users.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.update()).toThrowError();
      expect(() => users.update({})).toThrowError();
      expect(() => users.update({ data: {} })).toThrowError();
      expect(() => users.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() => users.update({ id: 123 })).toThrowError();
      expect(() => users.update({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('update many users', () => {
    test('should process w/ valid input', () => {
      expect(users.update_many({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users.json`,
        headers,
        data: {}
      });

      expect(users.update_many({ ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users.json?ids=1,2,3`,
        headers,
        data: {}
      });

      expect(users.update_many({ external_ids: '1,2,3', data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users.json?external_ids=1,2,3`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.update_many()).toThrowError();
      expect(() => users.update_many({})).toThrowError();
      expect(() => users.update_many({ data: 'invalid' })).toThrowError();
      expect(() => users.update_many({ ids: 123, data: {} })).toThrowError();
      expect(() =>
        users.update_many({ external_ids: 123, data: {} })
      ).toThrowError();
      expect(() =>
        users.update_many({ ids: '', external_ids: '', data: {} })
      ).toThrowError();
      expect(() =>
        users.update_many({ ids: '1,2,3', external_ids: '1,2,3', data: {} })
      ).toThrowError();
    });
  });

  describe('delete many users', () => {
    test('should process w/ valid input', () => {
      expect(users.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json?ids=1,2,3`,
        headers
      });

      expect(users.delete_many({ external_ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/destroy_many.json?external_ids=1,2,3`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.delete_many()).toThrowError();
      expect(() => users.delete_many({})).toThrowError();
      expect(() => users.delete_many({ ids: '' })).toThrowError();
      expect(() => users.delete_many({ ids: 123 })).toThrowError();
      expect(() => users.delete_many({ external_ids: '' })).toThrowError();
      expect(() => users.delete_many({ external_ids: 123 })).toThrowError();
    });
  });

  describe('delete user', () => {
    test('should process w/ valid input', () => {
      expect(users.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/123.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.delete()).toThrowError();
      expect(() => users.delete(123)).toThrowError();
      expect(() => users.delete({})).toThrowError();
      expect(() => users.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('search', () => {
    test('should process w/ valid input', () => {
      expect(users.search({ query: 'valid_query' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/search.json?query=valid_query`,
        headers
      });

      expect(users.search({ external_id: 'external_id' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/search.json?external_id=external_id`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.search()).toThrowError();
      expect(() => users.search({})).toThrowError();
      expect(() => users.search({ query: '' })).toThrowError();
      expect(() => users.search({ external_id: '' })).toThrowError();
      expect(() => users.search({ query: '', external_id: '' })).toThrowError();
      expect(() =>
        users.search({ query: 'query', external_id: 'external_id' })
      ).toThrowError();
    });
  });

  describe('autocomplete', () => {
    test('should process w/ valid input', () => {
      expect(users.autocomplete({ name: 'name' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/autocomplete.json?name=name`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.autocomplete()).toThrowError();
      expect(() => users.autocomplete({})).toThrowError();
      expect(() => users.autocomplete('name')).toThrowError();
      expect(() => users.autocomplete({ name: 123 })).toThrowError();
      expect(() => users.autocomplete({ name: '' })).toThrowError();
    });
  });

  describe('request create user', () => {
    test('should process w/ valid input', () => {
      expect(users.request_create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/request_create.json`,
        headers,
        data: {}
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.request_create()).toThrowError();
      expect(() => users.request_create({})).toThrowError();
      expect(() => users.request_create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('list deleted users', () => {
    test('should process w/ valid input', () => {
      expect(users.list_deleted()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_users.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.list_deleted('invalid')).toThrowError();
    });
  });

  describe('show deleted user', () => {
    test('should process w/ valid input', () => {
      expect(users.show_deleted({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/deleted_users/123.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.show_deleted()).toThrowError();
    });
  });

  describe('permanently delete user', () => {
    test('should process w/ valid input', () => {
      expect(users.permanently_delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/deleted_users/123.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.permanently_delete()).toThrowError();
      expect(() => users.permanently_delete({})).toThrowError();
      expect(() => users.permanently_delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('compliance deletion statuses', () => {
    test('should process w/ valid input', () => {
      expect(users.compliance_deletion_statuses({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/compliance_deletion_statuses.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.compliance_deletion_statuses()).toThrowError();
      expect(() =>
        users.compliance_deletion_statuses('invalid')
      ).toThrowError();
      expect(() => users.compliance_deletion_statuses({})).toThrowError();
      expect(() =>
        users.compliance_deletion_statuses({ id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('current authenticated user', () => {
    test('should process w/ valid input', () => {
      expect(users.current()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/me.json`,
        headers
      });
    });

    test('should throw error w/ invalid input', () => {
      expect(() => users.current('invalid')).toThrowError();
    });
  });
});
