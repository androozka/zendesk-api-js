const pkg = require('..');

describe('package', () => {
  let instance, headers;

  beforeEach(() => {
    instance = 'test';
    headers = {};
  });

  afterEach(() => {
    instance = '';
    headers = null;
  });

  test('zaf v2', () => {
    expect(typeof pkg.v2).toBe('function');
    expect(typeof pkg.v2({ instance, headers })).toBe('object');
  });
});
