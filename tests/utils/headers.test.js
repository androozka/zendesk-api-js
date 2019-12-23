const base64 = require('js-base64').Base64;
const { generate } = require('../../src/utils/headers');

describe('headers', () => {
  let options;

  beforeEach(() => {
    options = {
      email: 'user@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    options = null;
  });

  describe('generate', () => {
    it('should process using an email & password', () => {
      const { email, password } = options;
      const encoded = base64.encode(`${email}:${password}`);

      expect(generate({ email, password })).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`
      });
    });

    it('should process using an email & token', () => {
      const { email, token } = options;
      const encoded = base64.encode(`${email}/token:${token}`);

      expect(generate({ email, token })).toEqual({
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`
      });
    });

    it('should fail with invalid input', () => {
      const { email, token } = options;

      expect(() => generate()).toThrowError();
      expect(() => generate({})).toThrowError();
      expect(() => generate({ email })).toThrowError();
      expect(() => generate({ token })).toThrowError();
    });
  });
});
