const endpoint = require('../../../../src/api/support/incremental_skill_based_routing');
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
      expect(endpoint(options)).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => endpoint()).toThrowError();
      expect(() => endpoint({})).toThrowError();
    });
  });

  describe('Incremental Attributes Export', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.attributes()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attributes.json`,
        headers
      });

      expect(endPoint.attributes({ params: 'cursor=valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attributes.json?cursor=valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.attributes({ params: 123 })).toThrowError();
    });
  });

  describe('Incremental Attribute Values Export', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.attribute_values()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attribute_values.json`,
        headers
      });

      expect(endPoint.attribute_values({ params: 'cursor=valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/attribute_values.json?cursor=valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.attribute_values({ params: 123 })).toThrowError();
    });
  });

  describe('Incremental Instance Values Export', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.instance_values()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/instance_values.json`,
        headers
      });

      expect(endPoint.instance_values({ params: 'cursor=valid' })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/incremental/routing/instance_values.json?cursor=valid`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.instance_values({ params: 123 })).toThrowError();
    });
  });
});
