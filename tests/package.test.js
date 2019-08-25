const pkg = require('..');

describe('Zendesk App Frameworks', () => {
  const headers = {};
  let api;

  describe('v2', () => {
    beforeAll(() => (api = pkg.v2('', headers)));
    afterAll(() => (api = null));

    test('Support API', () => expect(api.support).toBeDefined());
  });
});
