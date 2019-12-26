const endpoint = require('../../../../src/api/support/organization_fields');
const { prepare } = require('../../../../src/utils/options');

describe('organizations', () => {
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

  describe('list organization fields', () => {
    it('should process without input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_fields.json`,
        headers
      });
    });
  });

  describe('show organization field', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/organization_fields/123.json`,
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

  describe('create organization fields', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/organization_fields.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.create()).toThrowError();
      expect(() => endPoint.create({})).toThrowError();
      expect(() => endPoint.create('invalid')).toThrowError();
      expect(() => endPoint.create({ ids: 'invalid' })).toThrowError();
    });
  });

  describe('update organization fields', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organization_fields/123.json`,
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

  describe('delete organization fields', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/organization_fields/123.json`,
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

  describe('reorder organization field', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.reorder({ data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/organization_fields/reorder.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.reorder()).toThrowError();
      expect(() => endPoint.reorder({})).toThrowError();
      expect(() => endPoint.reorder('invalid')).toThrowError();
      expect(() => endPoint.reorder({ data: 'invalid' })).toThrowError();
    });
  });
});
