const pkg = require('..');

describe('package', () => {
  test('zaf v2', () => expect(typeof pkg.v2).toBe('function'));
});
