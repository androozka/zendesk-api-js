const v2 = require('../../../src/v2');

const instance = '';
const headers = {};

describe('zaf v2', () => {
  let zaf;

  beforeEach(() => {
    zaf = v2({ instance, headers });
  });

  afterEach(() => {
    zaf = null;
  });

  test('support api', () => expect(zaf.support).toBeDefined());
});
