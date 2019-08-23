const pkg = require('..');

describe('Zendesk App Frameworks', () => {
  const headers = {};
  let api;

  describe('v2', () => {
    beforeAll(() => (api = pkg.v2('', headers)));
    afterAll(() => (api = null));

    test('support api', () => expect(api.support).toBeDefined());
  });
});
