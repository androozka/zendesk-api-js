const load = require('../../../src/utils/load');

describe('utils: load', () => {
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

    api = load(folder);
  });

  afterEach(() => {
    folder = null;
    endpoint = null;
    action = null;
    options = null;
  });

  it(`should load api "${folder}"`, () => {
    const api = load(folder);

    expect(api).toBeTruthy();
    expect(api.init).toBeTruthy();
    expect(api[endpoint]).toBeTruthy();
  });

  describe('init', () => {
    it(`should initialize api "${folder}"`, () => {
      const { instance, email, password } = options;
      const initialized = api.init({ instance, email, password });

      expect(initialized[endpoint][action]).toBeTruthy();
    });

    it('should fail with invalid options', () => {
      const { instance, email, password, token } = options;

      expect(() => api.init()).toThrowError();
      expect(() => api.init({})).toThrowError();
      expect(() => api.init({ instance })).toThrowError();
      expect(() => api.init({ email })).toThrowError();
      expect(() => api.init({ password })).toThrowError();
      expect(() => api.init({ token })).toThrowError();
      expect(() => api.init({ instance, email })).toThrowError();
      expect(() => api.init({ email, password })).toThrowError();
      expect(() => api.init({ email, token })).toThrowError();
      expect(() =>
        api.init({ instance, email, password, token })
      ).toThrowError();
    });
  });
});
