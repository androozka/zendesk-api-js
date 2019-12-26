const utilOptions = require('../../../src/utils/options');
const generate = require('../../../src/utils/headers/generate');

describe('util: options', () => {
  let options, validate, prepare;

  beforeEach(() => {
    ({ validate, prepare } = utilOptions);
    options = {
      instance: 'instance',
      email: 'user@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    options = null;
    validate = null;
    prepare = null;
  });

  describe('index', () => {
    it('should load files', () => {
      expect(validate).toBeTruthy();
      expect(prepare).toBeTruthy();
    });
  });

  describe('validate', () => {
    it('should process a valid options object', () => {
      let error;
      const { instance, email, password, token } = options;

      ({ error } = validate({ instance, email, password }));
      expect(error).toBeFalsy();

      ({ error } = validate({ instance, email, token }));
      expect(error).toBeFalsy();
    });

    it('should fail with missing instance', () => {
      const { email, password, token } = options;

      let { error } = validate({ email, password });
      expect(error).toBeTruthy();

      ({ error } = validate({ email, token }));
      expect(error).toBeTruthy();
    });

    it('should fail with missing email', () => {
      let error;
      const { instance, password, token } = options;

      ({ error } = validate({ instance, password }));
      expect(error).toBeTruthy();

      ({ error } = validate({ instance, token }));
      expect(error).toBeTruthy();
    });

    it('should fail with both password and token', () => {
      const { instance, email, password, token } = options;

      let { error } = validate({ instance, email, password, token });
      expect(error).toBeTruthy();
    });
  });

  describe('prepare', () => {
    it('should prepare url with provided instance', () => {
      const { instance, email, password } = options;
      const { url } = prepare({ instance, email, password });

      expect(url).toBeTruthy();
      expect(url).toEqual(`https://${instance}.zendesk.com`);
    });

    it('should prepare headers with provided password', () => {
      const { instance, email, password } = options;
      const { headers } = prepare({ instance, email, password });
      const genHeaders = generate({ instance, email, password });

      expect(headers).toEqual(genHeaders);
    });

    it('should prepare headers with provided token', () => {
      const { instance, email, token } = options;
      const { headers } = prepare({ instance, email, token });
      const genHeaders = generate({ instance, email, token });

      expect(headers).toEqual(genHeaders);
    });

    it('should fail with invalid input', () => {
      let { instance, email, password, token } = options;
      expect(() => prepare()).toThrowError();
      expect(() => prepare({})).toThrowError();
      expect(() =>
        prepare({ instance, email, password, token })
      ).toThrowError();
    });
  });
});
