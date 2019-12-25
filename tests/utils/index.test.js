const zdApi = require('../../src/');

describe('zdApi', () => {
  let folder, endpoint, action, options, api;

  beforeEach(() => {
    // Pick API endpoint for testing
    folder = 'support';
    endpoint = 'tickets';
    action = 'list';

    options = {
      instance: 'instance',
      email: 'test@email.com',
      password: 'password',
      token: 'token'
    };
  });

  afterEach(() => {
    folder = null;
    endpoint = null;
    action = null;
    options = null;
  });

  it(`should load api "${folder}"`, () => {
    expect(zdApi).toBeTruthy();
    expect(zdApi.init).toBeTruthy();
    expect(zdApi[folder]).toBeTruthy();
  });

  describe('init', () => {
    it(`should initialize api "${folder}"`, () => {
      const { instance, email, password } = options;
      const initialized = zdApi.init({ instance, email, password });

      expect(initialized).toBeTruthy();
      expect(initialized[folder]).toBeTruthy();
      expect(initialized[folder][endpoint]).toBeTruthy();
      expect(initialized[folder][endpoint][action]).toBeTruthy();
    });

    it('should fail with invalid options', () => {
      const { instance, email, password, token } = options;

      expect(() => zdApi.init()).toThrowError();
      expect(() => zdApi.init({})).toThrowError();
      expect(() => zdApi.init({ instance })).toThrowError();
      expect(() => zdApi.init({ email })).toThrowError();
      expect(() => zdApi.init({ password })).toThrowError();
      expect(() => zdApi.init({ token })).toThrowError();
      expect(() => zdApi.init({ instance, email })).toThrowError();
      expect(() => zdApi.init({ email, password })).toThrowError();
      expect(() => zdApi.init({ email, token })).toThrowError();
      expect(() =>
        api.init({ instance, email, password, token })
      ).toThrowError();
    });
  });
});
