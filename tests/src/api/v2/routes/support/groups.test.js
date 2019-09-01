const endpoint = require('../../../../../../src/api/v2/routes/support/groups');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('groups', () => {
  let groups;

  beforeEach(() => (groups = endpoint({ instance, headers })));
  afterEach(() => (groups = null));

  describe('list groups', () => {
    it('should process w/ valid input', () => {
      expect(groups.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups.json`,
        headers
      });

      expect(groups.list({})).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups.json`,
        headers
      });

      expect(groups.list({ user_id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/users/123/groups.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.list('invalid')).toThrowError();
      expect(() => groups.list({ invalid: 123 })).toThrowError();
      expect(() => groups.list({ user_id: 'invalid' })).toThrowError();
    });
  });

  describe('show assignable groups', () => {
    it('should process w/ valid input', () => {
      expect(groups.show_assignable()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/assignable.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.show_assignable('invalid')).toThrowError();
    });
  });

  describe('show group', () => {
    it('should process w/ valid input', () => {
      expect(groups.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/groups/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.show()).toThrowError();
      expect(() => groups.show({})).toThrowError();
      expect(() => groups.show('invalid')).toThrowError();
      expect(() => groups.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create group', () => {
    it('should process w/ valid input', () => {
      expect(groups.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/groups.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.create()).toThrowError();
      expect(() => groups.create({})).toThrowError();
      expect(() => groups.create('invalid')).toThrowError();
      expect(() => groups.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update group', () => {
    it('should process w/ valid input', () => {
      expect(groups.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/groups/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.update()).toThrowError();
      expect(() => groups.update('invalid')).toThrowError();
      expect(() => groups.update({})).toThrowError();
      expect(() => groups.update({ id: 'invalid' })).toThrowError();
      expect(() => groups.update({ id: 123, data: 'invalid' })).toThrowError();
    });
  });

  describe('delete group', () => {
    it('should process w/ valid input', () => {
      expect(groups.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/groups/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => groups.delete()).toThrowError();
      expect(() => groups.delete({})).toThrowError();
      expect(() => groups.delete('invalid')).toThrowError();
      expect(() => groups.delete({ id: 'invalid' })).toThrowError();
    });
  });
});
