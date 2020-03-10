const endpoint = require('../../../../src/api/support/locales');
const { prepare } = require('../../../../src/utils/options');

describe('Locales', () => {
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

  describe('List Locales', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.list()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales.json`,
        headers
      });
    });
  });

  describe('List Available Public Locales', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.public()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales/public.json`,
        headers
      });
    });
  });

  describe('List Locales for Agent', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.agent()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales/agent.json`,
        headers
      });
    });
  });

  describe('Show Locale', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.show({ id: 123 })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales/123.json`,
        headers
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.show()).toThrowError();
      expect(() => endPoint.show({})).toThrowError();
      expect(() => endPoint.show({ id: 'invalid' })).toThrowError();
    });
  });

  describe('Show Current Locale', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.current()).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales/current.json`,
        headers
      });
    });
  });

  describe('Detect best language for user', () => {
    it('should process w/ valid input', () => {
      expect(endPoint.detect({ data: {} })).toEqual({
        method: 'GET',
        url: `${url}/api/v2/locales/detect_best_locale.json`,
        headers,
        data: {}
      });
    });

    it('should throw error w/ invalid input', () => {
      expect(() => endPoint.detect()).toThrowError();
      expect(() => endPoint.detect({})).toThrowError();
      expect(() => endPoint.detect({ data: 'invalid' })).toThrowError();
    });
  });
});
