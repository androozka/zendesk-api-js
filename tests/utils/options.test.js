const { validate, prepare } = require('../../src/utils/options');

describe('util: options', () => {
  let options;

  beforeEach(() => {
    options = {
      instance: 'instance',
      email: 'user@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    options = null;
  });

  describe('validate', () => {
    it('should setup validate function', () => {
      expect(validate).toBeTruthy();
    });

    it('should process a valid options object', () => {
      expect(validate(options)).toBeTruthy();
    });
  });

  describe('prepare', () => {
    it('should setup prepare function with password', () => {
      const { instance, email, password } = options;
      const { url, headers } = prepare({ instance, email, password });

      expect(url).toBeTruthy();
      expect(headers).toBeTruthy();
    });

    it('should setup prepare function with token', () => {
      const { instance, email, token } = options;
      const { url, headers } = prepare({ instance, email, token });

      expect(url).toBeTruthy();
      expect(headers).toBeTruthy();
    });

    it('should fail with invalid input', () => {
      expect(() => prepare()).toThrowError();
      expect(() => prepare(options)).toThrowError();
    });
  });
});
