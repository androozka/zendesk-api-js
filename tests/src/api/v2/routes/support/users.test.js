const endpoint = require('../../../../../../src/api/v2/routes/support/users');

const instance = 'instance';
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
        url: `https://${instance}.zendesk.com/api/v2/users.json`,
        headers
      });

      expect(users.list({ type: 'groups', id: 123 })).toEqual({
        method: 'GET',
        url: `https://${instance}.zendesk.com/api/v2/groups/123/users.json`,
        headers
      });

      expect(users.list({ type: 'organizations', id: 123 })).toEqual({
        method: 'GET',
        url: `https://${instance}.zendesk.com/api/v2/organizations/123/users.json`,
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
        url: `https://${instance}.zendesk.com/api/v2/users/123.json`,
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
        url: `https://${instance}.zendesk.com/api/v2/users/show_many.json?ids=1,2,3`,
        headers
      });

      expect(users.show_many({ external_ids: '1,2,3' })).toEqual({
        method: 'GET',
        url: `https://${instance}.zendesk.com/api/v2/users/show_many.json?external_ids=1,2,3`,
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
});
