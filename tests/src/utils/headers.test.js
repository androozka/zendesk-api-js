const base64 = require('js-base64').Base64;
const utilHeaders = require('../../../src/utils/headers');

describe('headers', () => {
  let options, generate;

  beforeEach(() => {
    ({ generate } = utilHeaders);
    options = {
      email: 'user@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    options = null;
    generate = null;
  });

  describe('index', () => {
    it('should load files', () => {
      expect(generate).toBeTruthy();
    });
  });

  describe('generate', () => {
    it('should process using provided email & password', () => {
      const { email, password } = options;
      const encoded = base64.encode(`${email}:${password}`);

      expect(generate({ email, password })).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`
      });
    });

    it('should process using provided email & token', () => {
      const { email, token } = options;
      const encoded = base64.encode(`${email}/token:${token}`);

      expect(generate({ email, token })).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`
      });
    });

    it('should fail with invalid input', () => {
      const { email, password, token } = options;

      expect(() => generate()).toThrowError();
      expect(() => generate({})).toThrowError();
      expect(() => generate({ email })).toThrowError();
      expect(() => generate({ password })).toThrowError();
      expect(() => generate({ token })).toThrowError();
      expect(() => generate({ email, password, token })).toThrowError();
    });
  });
});
