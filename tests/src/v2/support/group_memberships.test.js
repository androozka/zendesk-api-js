const endpoint = require('../../../../src/v2/support/group_memberships');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('group memberships', () => {
  let groupMemberships;

  beforeEach(() => (groupMemberships = endpoint({ instance, headers })));
  afterEach(() => (groupMemberships = null));

  describe('list memberships', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/group_memberships.json`,
        headers
      });

      expect(groupMemberships.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/group_memberships.json`,
        headers
      });

      expect(groupMemberships.list({ group_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/456/memberships.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.list('invalid')).toThrowError();
      expect(() =>
        groupMemberships.list({ user_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        groupMemberships.list({ group_id: 'invalid' })
      ).toThrowError();
      expect(() =>
        groupMemberships.list({ user_id: 123, group_id: 456 })
      ).toThrowError();
    });
  });

  describe('list assignable memberships', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.assignable()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/group_memberships/assignable.json`,
        headers
      });

      expect(groupMemberships.assignable({ group_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/456/memberships/assignable.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.assignable('invalid')).toThrowError();
      expect(() =>
        groupMemberships.assignable({ group_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('show membership', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/group_memberships/123.json`,
        headers
      });

      expect(groupMemberships.show({ id: 123, user_id: 456 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/456/group_memberships/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.show()).toThrowError();
      expect(() => groupMemberships.show('invalid')).toThrowError();
      expect(() => groupMemberships.show({})).toThrowError();
      expect(() =>
        groupMemberships.show({ user_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('create membership', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/group_memberships.json`,
        headers,
        data: {}
      });

      expect(groupMemberships.create({ user_id: 123, data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/users/123/group_memberships.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.create()).toThrowError();
      expect(() => groupMemberships.create('invalid')).toThrowError();
      expect(() => groupMemberships.create({})).toThrowError();
      expect(() => groupMemberships.create({ data: 'invalid' })).toThrowError();
      expect(() =>
        groupMemberships.create({ user_id: 'invalid', data: {} })
      ).toThrowError();
    });
  });

  describe('bulk create memberships', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.create_many({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/group_memberships/create_many.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.create_many()).toThrowError();
      expect(() => groupMemberships.create_many('invalid')).toThrowError();
      expect(() => groupMemberships.create_many({})).toThrowError();
      expect(() =>
        groupMemberships.create_many({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete membership', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/group_memberships/123.json`,
        headers
      });

      expect(groupMemberships.delete({ id: 123, user_id: 456 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/users/456/group_memberships/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.delete()).toThrowError();
      expect(() => groupMemberships.delete('invalid')).toThrowError();
      expect(() => groupMemberships.delete({})).toThrowError();
      expect(() => groupMemberships.delete({ id: 'invalid' })).toThrowError();
      expect(() =>
        groupMemberships.delete({ id: 123, user_id: 'invalid' })
      ).toThrowError();
    });
  });

  describe('bulk delete memberships', () => {
    it('should process w/ valid input', () => {
      expect(groupMemberships.delete_many({ ids: '1,2,3' })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/group_memberships/destroy_many.json?ids=1,2,3`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.delete_many()).toThrowError();
      expect(() => groupMemberships.delete_many('invalid')).toThrowError();
      expect(() => groupMemberships.delete_many({})).toThrowError();
      expect(() => groupMemberships.delete_many({ ids: 0 })).toThrowError();
    });
  });

  describe('set membership as default', () => {
    it('should process w/ valid input', () => {
      expect(
        groupMemberships.default({ user_id: 123, membership_id: 456 })
      ).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/users/123/group_memberships/456/make_default.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groupMemberships.default()).toThrowError();
      expect(() => groupMemberships.default('invalid')).toThrowError();
      expect(() => groupMemberships.default({})).toThrowError();
      expect(() => groupMemberships.default({ ids: 0 })).toThrowError();
    });
  });
});
