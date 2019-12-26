const endpoint = require('../../../../src/api/support/custom_agent_roles');
const { prepare } = require('../../../../src/utils/options');

describe('support: custom agent roles', () => {
  let custom_agent_roles, options, url, headers;

  beforeEach(() => {
    options = {
      instance: 'instance',
      email: 'user@email.com',
      token: 'token'
    };
    custom_agent_roles = endpoint(options);
    ({ url, headers } = prepare(options));
  });

  afterEach(() => {
    options = null;
    custom_agent_roles = null;
    url = null;
    headers = null;
  });

  describe('init', () => {
    it('should setup endpoint object', () => {
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('list custom roles', () => {
    it('should process without input', () => {
      expect(custom_agent_roles.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/custom_roles.json`,
        headers
      });
    });
  });

  describe('show custom role', () => {
    it('should process w/ valid input', () => {
      expect(custom_agent_roles.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => custom_agent_roles.show()).toThrowError();
      expect(() => custom_agent_roles.show({})).toThrowError();
      expect(() => custom_agent_roles.show('invalid')).toThrowError();
      expect(() => custom_agent_roles.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('create custom role', () => {
    it('should process w/ valid input', () => {
      expect(custom_agent_roles.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/custom_roles.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => custom_agent_roles.create()).toThrowError();
      expect(() => custom_agent_roles.create({})).toThrowError();
      expect(() => custom_agent_roles.create('invalid')).toThrowError();
      expect(() =>
        custom_agent_roles.create({ data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('update custom role', () => {
    it('should process w/ valid input', () => {
      expect(custom_agent_roles.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => custom_agent_roles.update()).toThrowError();
      expect(() => custom_agent_roles.update({})).toThrowError();
      expect(() => custom_agent_roles.update('invalid')).toThrowError();
      expect(() => custom_agent_roles.update({ id: 0 })).toThrowError();
      expect(() => custom_agent_roles.update({ id: 'invalid' })).toThrowError();
      expect(() =>
        custom_agent_roles.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('delete custom role', () => {
    it('should process w/ valid input', () => {
      expect(custom_agent_roles.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/custom_roles/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => custom_agent_roles.delete()).toThrowError();
      expect(() => custom_agent_roles.delete({})).toThrowError();
      expect(() => custom_agent_roles.delete('invalid')).toThrowError();
      expect(() => custom_agent_roles.delete({ id: 'invalid' })).toThrowError();
    });
  });
});
