const endpoint = require('../../../../src/api/support/sla_policies');
const { prepare } = require('../../../../src/utils/options');

describe('SLA Policies', () => {
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
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('List SLA Policies', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/slas/policies`,
        headers
      });
    });
  });

  describe('Get SLA Policy', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.get({ id: '123' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/slas/policies/123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.get()).toThrowError();
      expect(() => endPoint.get({})).toThrowError();
      expect(() => endPoint.get({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Create SLA Policy', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/slas/policies`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create({ data: 'invalid' })).toThrowError();
    });
  });

  describe('Update SLA Policy', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/slas/policies/123`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.update()).toThrowError();
      expect(() => endPoint.update({})).toThrowError();
      expect(() => endPoint.update({ data: {} })).toThrowError();
      expect(() => endPoint.update({ id: 'invalid', data: {} })).toThrowError();
      expect(() =>
        endPoint.update({ id: 123, data: 'invalid' })
      ).toThrowError();
    });
  });

  describe('Delete SLA Policy', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/slas/policies/123`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.delete()).toThrowError();
      expect(() => endPoint.delete('invalid')).toThrowError();
      expect(() => endPoint.delete({})).toThrowError();
      expect(() => endPoint.delete({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Reorder SLA Policies', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/slas/policies/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.reorder()).toThrowError();
      expect(() => endPoint.reorder('invalid')).toThrowError();
      expect(() => endPoint.reorder({})).toThrowError();
      expect(() => endPoint.reorder({ data: 'invalid' })).toThrowError();
    });
  });

  describe('Retrieve supported filter definition items', () => {
    it('should process without input', () => {
      expect(endPoint.definitions()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/slas/policies/definitions.json`,
        headers
      });
    });
  });
});
