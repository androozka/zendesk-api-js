const endpoint = require('../../../../src/api/support/brands');
const { prepare } = require('../../../../src/utils/options');

describe('Brands', () => {
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

  describe('List Brands', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/brands.json`,
        headers
      });
    });
  });

  describe('Show a Brand', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/brands/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Create Brand', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.create({ data: {} })).toEqual({
        method: 'POST',
        url: `${url}/api/v2/brands.json`,
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

  describe('Update a Brand', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.update({ id: 123, data: {} })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/brands/123.json`,
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

  describe('Delete a Brand', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.delete({ id: 123 })).toEqual({
        method: 'DELETE',
        url: `${url}/api/v2/brands/123.json`,
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

  describe('Check host mapping validity', () => {
    it('should process w/ valid input', () => {
      expect(
        endPoint.check({ host_mapping: 'host_mapping', subdomain: 'subdomain' })
      ).toEqual({
        method: 'GET',
        url: `${url}/api/v2/brands/check_host_mapping.json?host_mapping=host_mapping&subdomain=subdomain`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.check()).toThrowError();
      expect(() => endPoint.check('invalid')).toThrowError();
      expect(() => endPoint.check({})).toThrowError();
      expect(() => endPoint.check({ host_mapping: 0 })).toThrowError();
      expect(() =>
        endPoint.check({ host_mapping: 'valid', subdomain: 0 })
      ).toThrowError();
    });
  });

  describe('Check host mapping validity for an existing brand', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.check_existing({ id: 123 })).toEqual({
        method: 'PUT',
        url: `${url}/api/v2/brands/123/check_host_mapping.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.check_existing()).toThrowError();
      expect(() => endPoint.check_existing('invalid')).toThrowError();
      expect(() => endPoint.check_existing({})).toThrowError();
      expect(() => endPoint.check_existing({ id: 0 })).toThrowError();
    });
  });
});
