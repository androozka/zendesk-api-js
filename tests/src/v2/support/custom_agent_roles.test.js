const endpoint = require('../../../../src/v2/support/custom_agent_roles');

const instance = 'instance';
const url = `https://${instance}.zendesk.com`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Basic <64bit_encoded_credentials>'
};

describe('custom agent roles', () => {
  let customAgentRoles;

  beforeEach(() => (customAgentRoles = endpoint({ instance, headers })));
  afterEach(() => (customAgentRoles = null));

  describe('list custom roles', () => {
    it('should process w/ valid input', () => {
      expect(customAgentRoles.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/custom_roles.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => customAgentRoles.list('invalid')).toThrowError();
    });
  });

  describe('show custom role', () => {
    it('should process w/ valid input', () => {
      expect(customAgentRoles.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => customAgentRoles.show()).toThrowError();
      expect(() => customAgentRoles.show({})).toThrowError();
      expect(() => customAgentRoles.show('invalid')).toThrowError();
      expect(() => customAgentRoles.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create custom role', () => {
    it('should process w/ valid input', () => {
      expect(customAgentRoles.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/custom_roles.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => customAgentRoles.create()).toThrowError();
      expect(() => customAgentRoles.create({})).toThrowError();
      expect(() => customAgentRoles.create('invalid')).toThrowError();
      expect(() => customAgentRoles.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('update custom role', () => {
    it('should process w/ valid input', () => {
      expect(customAgentRoles.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => customAgentRoles.update()).toThrowError();
      expect(() => customAgentRoles.update({})).toThrowError();
      expect(() => customAgentRoles.update('invalid')).toThrowError();
      expect(() => customAgentRoles.update({ id: 0 })).toThrowError();
      expect(() => customAgentRoles.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        customAgentRoles.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete custom role', () => {
    it('should process w/ valid input', () => {
      expect(customAgentRoles.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => customAgentRoles.delete()).toThrowError();
      expect(() => customAgentRoles.delete({})).toThrowError();
      expect(() => customAgentRoles.delete('invalid')).toThrowError();
      expect(() => customAgentRoles.delete({ id: 'invalid' })).toThrowError();
    });
  });
});
